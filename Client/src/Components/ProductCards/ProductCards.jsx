import React from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

function ProductCards({ limit, showSearch, showPagination }) {
    return (
        <>
            <main className="p-[max(6vw,6rem)] xs:p-[max(1.5vw,1.5rem)]  overflow-hidden">
                <h1
                    className="font-b text-center dark:text-white xs:overflow-hidden"
                    data-aos="zoom-in"

                    data-aos-duration="600"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="false"
                >
                    Featured Products
                </h1>
                <div className=" py-[10vh]">
                    <Card limit={limit} showSearch={showSearch} showPagination={showPagination} />
                </div>
                <div className="text-center">
                    <Link to='/product' className="dark:hover:text-[--red] hover:text-[--red] dark:text-white" >
                        VIEW ALL PRODUCTS
                    </Link>
                </div>
            </main>
        </>
    );
}

export default ProductCards;
