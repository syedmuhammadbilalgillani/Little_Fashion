import React, { useEffect, useState } from "react";
import ProductTab from "../ProductHero/ProductTab";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useCart } from "../../context/cartContext";

function ProductDetail() {
  const { addToCart } = useCart();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1); // State to store selected quantity

  useEffect(() => {
    const fetchProductById = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://littlefasionserver.vercel.app/api/v1/product/readById/${productId}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.images[0]);
      } catch (error) {
        console.error("Error fetching product by ID:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductById();
  }, [productId]);

  const handleImageClick = (image) => setSelectedImage(image);

  const handleAddToCart = () => {
    addToCart(product._id, selectedQuantity); // Use selected quantity when adding to cart
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value)); // Update selected quantity state
  };

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
      <div className="grid grid-cols-4 bg-sky-100 dark:dark:bg-gray-800 py-[8vw]">
        <div className="col-span-4 xs:col-span-full  sm:mt-20 xs:mt-20">
          <ProductTab
            headingText="Fashionable Stuffs"
            headingRed="We provide you"
          ></ProductTab>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && product && (
        <div className="grid grid-cols-2 px-[6%] w-full py-[9vw] dark:text-white">
          <div className="col-span-1 md:col-span-2 sm:col-span-2 xs:col-span-2">
            <img src={selectedImage} className="w-full" alt={product.name} />
            {product.images.length > 1 &&
              product.images.map((image, index) => (
                <div key={index} className="inline-block my-2 mr-2 mb-2">
                  <img
                    src={image}
                    alt="Product Image"
                    className="h-36 cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  />
                </div>
              ))}
          </div>
          <div className="col-span-1 md:col-span-2 sm:col-span-2 xs:col-span-2 mx-[2vw] p-[3vw]">
            <div className="flex items-center  justify-between text-black dark:text-white">
              <h1 className="text-[max(2.9vw,2rem)] font-extrabold">
                {product.name}
              </h1>
              <p className="text-[max(1vw,1rem)]">${product.price} </p>
            </div>
            <h3 className="text-[max(1vw,1rem)] font-extralight font-sans">
              Original package design from house
            </h3>
            <div className="my-[max(2vw,2rem)] space-y-3">
              <h3 className="text-[max(1vw,1rem)] font-bold font-sans">
                Description
              </h3>
              <p className="text-[max(1.3vw,1.3rem)] font-sans font-extralight">
                {product.description}
              </p>
              <div className="flex xs:flex-wrap justify-between w-full gap-[1vw] py-[max(3vw,3rem)] ">
                <div className="w-full border-gray-400 bg-white text-black border text-[max(1vw,1rem)] ">
                  <select
                    id="numbers"
                    className="bg-white p-[1vw]  outline-none w-full"
                    onChange={handleQuantityChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="uppercase w-full bg-black hover:bg-[--red] p-3 text-[max(1vw,0.8rem)] text-white"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
