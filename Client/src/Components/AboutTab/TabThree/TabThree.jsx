import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tabimg from "../TabThree.jpeg";
// import { Progress } from "flowbite-react";

function TabThree() {



    return (
        <>
            <section className="grid grid-cols-12 gap-[max(1.2vw,1.2rem)]">
                <div className="col-span-6 xs:col-span-12 sm:col-span-12  ">
                    <img src={Tabimg} className="w-screen" alt="" />
                </div>
                <div className="col-span-6 xs:col-span-12 sm:col-span-12
                 space-y-3 flex flex-col justify-between h-full">
                    <div>
                        <h2 className="font-bold text-[max(1.9vw,1.9rem)] text-black dark:text-white">
                            What can help you?
                        </h2>
                        <p className="text-[max(1.2vw,1.2rem)] text-gray-500 dark:text-white space-y-3">
                            Over three years in business, We’ve had the chance on projects
                        </p>

                        <div className="space-y-6">
                            <div className="flex flex-col gap-1 ">
                                <div className="text-[max(1vw,1rem)] font-medium dark:text-white">Branding</div>
                                {/* <Progress progress={90} size="xl" color="gray" labelProgress progressLabelPosition="inside" /> */}
                            </div>
                            <div className="flex flex-col gap-2 ">
                                <div className="text-[max(1vw,1rem)]  font-medium dark:text-white">Design & Stragety</div>
                                {/* <Progress progress={70} size="xl" color="gray" labelProgress progressLabelPosition="inside" /> */}
                            </div>
                            <div className="flex flex-col gap-2 ">
                                <div className="text-[max(1vw,1rem)] font-medium dark:text-white">Online Platform</div>
                                {/* <Progress progress={80} size="xl" color="gray" labelProgress progressLabelPosition="inside" /> */}
                            </div>
                        </div>
                    </div>
                    <Link
                        to="/product"
                        className=" item text-[max(.9vw,.9rem)] dark:text-white text-gray-500 item  transition-all ease-in-out duration-75 flex items-center gap-2"
                    >
                        <span className="hover:text-orange-500">EXPLORE PRODUCTS </span>
                        <i className="fa-thin fa-arrow-right-long icon text-[max(.9vw,.9rem)] opacity-0"></i>
                    </Link>

                </div>
            </section>
            {/* 
            <section className="grid grid-cols-12 gap-[max(1.2vw,1.2rem)]">
                <div className="col-span-6 xs:col-span-12 sm:col-span-12  ">
                    <div className="">
                        <img src={Tabimg} alt="" />
                    </div>
                </div>
                <div className="col-span-6 xs:col-span-12 sm:col-span-12">
                    <div className="space-y-3 flex flex-col justify-between h-full">
                        <div>
                            <div className=" font-bold text-[max(1.9vw,1.9rem)] text-black dark:text-white">
                                <h2>What can help you?</h2>
                            </div>
                            <div className="text-[max(1.2vw,1.2rem)] text-gray-500 dark:text-white space-y-3">
                                <p>
                                    Over three years in business, We’ve had the chance on projects
                                </p>
                            </div>
                            <div></div>
                        </div>

                        <div className="text-gray-500 item dark:text-white transition-all ease-in-out duration-75 flex items-center gap-2">
                            <Link
                                to="/product"
                                className="hover:text-orange-500 text-[max(.9vw,.9rem)]"
                            >
                                EXPLORE PRODUCTS
                            </Link>
                            <i className="fa-thin fa-arrow-right-long icon text-[max(.9vw,.9rem)] opacity-0"></i>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}

export default TabThree;
