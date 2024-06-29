import React from "react";

import { Link } from "react-router-dom";
function ProductTab({
    img,
    headingText,
    paragraphText,
    linkText,
    linkTo,
    headingRed,
    order,
    col,
}) {
    return (
        <>
            <div className="py-[10vh]">
                <main className="grid grid-cols-12 gap-[max(3vw,3rem)] xs:gap-0 sm:gap-0 xs:space-y-20 sm:space-y-20 bg-sky-100  dark:dark:bg-gray-800 overflow-hidden">
                    {(img || null) && (
                        <div
                            className={`col-span-6 sm:col-span-12 xs:col-span-12   ${order ? "order-1" : ""
                                } ${col ? "hidden" : ""} `}
                            data-aos="fade-up-right"

                            data-aos-duration="600"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="false"
                        >
                            {" "}
                            <img src={img} className="w-full" alt="" />
                        </div>
                    )}
                    {(headingText ||
                        headingRed ||
                        paragraphText ||
                        linkText ||
                        linkTo) && (
                            <div
                                className={`col-span-6 sm:col-span-12 xs:col-span-12 
                                    flex flex-col justify-center px-[max(3vw,3rem)] xs:px-[max(1vw,1rem)] space-y-7  ${col
                                        ? "col-span-12  py-[max(10vw,10rem)]"
                                        : ""
                                    } `}
                                data-aos="fade-up-left"

                                data-aos-duration="600"
                                data-aos-easing="ease-in-out"
                                data-aos-mirror="false"
                            >
                                <h1 className=" font-b dark:text-white">
                                    <span className="font-b c-red">{headingRed} </span>{" "}
                                    {headingText}
                                </h1>
                                <p className="text-[max(1.25vw,1.25rem)] dark:text-white text-[--p]">
                                    {" "}
                                    {paragraphText}
                                </p>
                                <Link
                                    to={linkTo}
                                    className=" item text-[max(.9vw,.9rem)] dark:text-white text-gray-500 item  transition-all ease-in-out duration-75 flex items-center gap-2"
                                >
                                    <span className="hover:text-orange-500">{linkText} </span>
                                    <i className="fa-thin fa-arrow-right-long icon text-[max(.9vw,.9rem)] opacity-0"></i>
                                </Link>
                            </div>
                        )}
                </main>
            </div>
        </>
    );
}

export default ProductTab;
