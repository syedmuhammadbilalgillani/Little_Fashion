import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function Card({ limit, showSearch = true, showPagination = true }) {
    const [products, setProducts] = useState([]);
    const [badges, setBadges] = useState([]);
    const [categories, setCategories] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Change this value as needed
    const inputRef = useRef(null);

    useEffect(() => {
        fetchData("/port/api/v1/badge/readBadge", setBadges);
        fetchData("/port/api/v1/category/readCategories", setCategories);
        fetchProducts();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setExpanded(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [searchTerm]);

    const fetchData = async (url, setter) => {
        try {
            const res = await axios.get(url);
            setter(res.data);
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch("/port/api/v1/product/read");
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset current page when search term changes
    };

    const toggleWidth = () => setExpanded(!expanded);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, limit);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition:Flip
            />
            {showSearch && (
                <div>
                    <input
                        type="text"
                        placeholder="Search product"
                        value={searchTerm}
                        className={`focus:outline-none border-[1px] border-gray-300 rounded-md p-1.5 ${expanded ? 'w-72' : 'w-16'
                            } transition-all duration-300`}
                        onChange={handleSearch}
                        ref={inputRef}
                        onClick={toggleWidth}
                    />
                </div>
            )}
            {currentItems.length === 0 ? (
                <p className="text-center text-gray-500 text-4xl m-8">
                    No products available.
                </p>
            ) : (
                <>
                    <section className="grid grid-cols-12 py-[3%] gap-[5vw]">
                        {currentItems.map((product) => (
                            <ProductItem key={product._id} product={product} badges={badges} />
                        ))}
                    </section>
                    {showPagination && (
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            paginate={paginate}
                        />
                    )}
                </>
            )}
        </>
    );
}

const ProductItem = ({ product, badges }) => (
    <div className="col-span-4 xs:col-span-12 md:col-span-6" data-aos="flip-up"
        data-aos-duration="600"
        data-aos-easing="ease-in-out"
        data-aos-mirror="false">
        <div className="relative ease-linear">
            <div className="flex justify-between px-[max(1.25vw,1.25rem)] py-[max(.8vw,.8rem)] w-full absolute top-0 left-0 overflow-hidden">
                <span className="bg-gray-100 text-gray-800 text-[max(.8vw,.8rem)] font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                    {badges.find(badge => badge._id === product.badgeId)?.name}
                </span>
                <i className="fa-solid fa-heart text-white text-[max(1vw,1rem)] hover:text-[--red]"></i>
            </div>
            <Link to={`/product/${product._id}`}>
                <img
                    src={product.images[0]}
                    className="transition-all ease-out hover:shadow-2xl shadow-slate-200 dark:hover:shadow-slate-400"
                    alt=""
                    loading="lazy"
                />
            </Link>
            <Link to={`/product/${product._id}`} className="py-[max(1vw,1rem)] flex justify-between items-center">
                <div>
                    <div className="text-[max(1.7vw,1.6rem)] dark:text-gray-300 font-medium hover:text-[--red] dark:hover:text-[--red]">
                        {product.name}
                    </div>
                    <h4 className="text-[max(1vw,1rem)] text-[--p] select-none">
                        {product.description}
                    </h4>
                </div>
                <div className="text-[max(1.3vw,1.3rem)] text-[--p] select-none">
                    {product.price}$
                </div>
            </Link>
        </div>
    </div>
);

const Pagination = ({ totalPages, currentPage, paginate }) => (
    <div className="flex justify-center mt-4 gap-2">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded-md bg-gray-200"><i className="fa-solid fa-angle-left"></i></button>
        <ul className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index}>
                    <button
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-200'
                            }`}
                    >
                        {index + 1}
                    </button>
                </li>
            ))}
        </ul>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 rounded-md bg-gray-200"><i className="fa-solid fa-angle-right"></i></button>
    </div>
);

export default Card;
