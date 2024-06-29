import React, { useEffect } from "react";
import { useCart } from "../context/cartContext";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const CartPage = () => {
    const { cartItems, removeOneFromCart, fetchCart } = useCart();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleRemoveOneFromCart = (productId) => {
        removeOneFromCart(productId);
    };

    const cartEmpty = cartItems.length === 0;

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
            <div className=" mx-auto px-4 py-10 h-auto min-h-screen xs:overflow-hidden">
                <h1 className="text-3xl dark:text-white font-bold mb-8 text-center">
                    Your Cart
                </h1>
                {cartEmpty ? (
                    <div className="text-lg text-center text-gray-600 dark:text-slate-400">
                        Your cart is empty. Add some{" "}
                        <Link to="/product" className="text-orange-600">
                            Products
                        </Link>{" "}
                        to continue shopping.
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <li
                                className="relative flex xs:flex-wrap  justify-between items-center p-6 xs:p-4 border border-neutral-300 rounded-md "
                                key={item._id}
                            >
                                <div className="flex flex-wrap justify-center gap-[3.2vw]">
                                    <div className="relative">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <span className="absolute -top-5 -right-5 mt-1 mr-1 bg-red-500 text-white py- px-2 rounded-full">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className=" text-base font-medium text-gray-900 dark:text-slate-300">
                                        <h3>{item.product.name}</h3>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            {item.product.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col flex-wrap justify-center  text-center gap-[1vw]">
                                    <p className="text-gray-700 dark:text-gray-400 font-extralight">
                                        <span className="font-bold">Price:</span> $
                                        {item.product.price}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-400 font-extralight">
                                        <span className="font-bold">Total:</span> ${item.totalPrice}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveOneFromCart(item.product._id)}
                                    className="font-medium absolute -right-3 -top-4 text-whie text-gray-700 shadow-2xl rounded-full  hover:text-black focus:outline-none"
                                >
                                    <i
                                        className="fa-duotone fa-circle-xmark text-3xl font-light  "
                                        style={{
                                            "--fa-primary-color": "#FF0000",
                                            "--fa-secondary-clor": "#ffffff",
                                            "--fa-secondary-opacity": "1",
                                        }}
                                    >
                                        {" "}
                                    </i>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                {cartEmpty || (
                    <div className="mt-10 text-end">
                        <Link
                            to="/order"
                            className="uppercase w-full rounded-lg bg-black hover:bg-[--red] p-3 text-[max(1vw,0.8rem)]  text-white"
                        >
                            Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPage;
