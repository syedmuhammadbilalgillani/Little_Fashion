import React, { useState } from "react";
import ProductTab from "../Components/ProductHero/ProductTab.jsx";
import Card from "../Components/Card/Card.jsx";

function Product() {
    const productObj = {
        headingRed: "Choose your",
        headingText: "favorite stuffs",
    };

    return (
        <>
            <div className="grid grid-cols-4 bg-sky-100 dark:dark:bg-gray-800  py-[8vw] sm:pt-[30%] xs:pt-[30%]">
                <div className="col-span-3 xs:col-span-full  ">
                    <ProductTab
                        headingText={productObj.headingText}
                        headingRed={productObj.headingRed}
                    ></ProductTab>
                </div>
                <div className="col-span-1  xs:hidden sm:"></div>
            </div>
            <div className=" mx-auto px-[7%] py-[10%]">

                <Card></Card>
            </div>
        </>
    );
}

export default Product;
