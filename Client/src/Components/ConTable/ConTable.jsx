import React from "react";
import { Link } from "react-router-dom";

function ConTable() {
    return (
        <>
            <div className="grid grid-cols-4 max-w-full w-full dark:text-white p-[max(2vw,2rem)] ">
                <div className="col-span-2  xs:col-span-4 xs:border-none  border-e border-gray-300 dark:border-gray-600 p-[max(1vw,1rem)] ">
                    <h1 className="text-[max(1.6vw,1.6rem)] font-medium ">New Business</h1>
                    <Link className="mt-[max(0.7vw,0.7rem)] text-[max(0.9vw,0.9rem)] text-[--p] font-bold">
                        HELLO@COMPANY.COM
                    </Link>
                </div>
                <div className="col-span-2  xs:col-span-4 xs:border-none   p-[max(1vw,1rem)]  ">
                    <h6 className="text-[max(1.6vw,1.6rem)] font-medium">Main Studio</h6>

                    <Link className="mt-[max(0.7vw,0.7rem)] text-[max(0.9vw,0.9rem)] text-[--p] font-bold uppercase">
                        studio@company.com
                        <i className="bi-arrow-right ms-2"></i>
                    </Link>
                </div>

                <div className="col-span-2  xs:col-span-4 xs:border-none    border-e border-t border-gray-300 dark:border-gray-600 p-[max(1vw,1rem)]">
                    <h6 className="text-[max(1.6vw,1.6rem)] font-medium">Our Office</h6>

                    <Link className="mt-[max(0.7vw,0.7rem)] text-[max(0.9vw,0.9rem)] text-[--p] font-bold uppercase">
                        Akershusstranda 20, 0150 Oslo, Norway
                        <i className="bi-arrow-right ms-2"></i>
                    </Link>
                </div>
                <div className="col-span-2  xs:col-span-4 xs:border-none   border-t border-gray-300 dark:border-gray-600 p-[max(1vw,1rem)]">
                    <h6 className="text-[max(1.6vw,1.6rem)] font-medium">Our Socials</h6>
                    <div className="mt-[max(0.7vw,0.7rem)] text-[max(0.9vw,0.9rem)] text-[--p] space-x-2">

                        <Link><i className="fa-brands fa-youtube hover:text-[--red]"></i></Link>
                        <Link><i className="fa-brands fa-whatsapp hover:text-[--red]"></i></Link>
                        <Link><i className="fa-brands fa-instagram hover:text-[--red]"></i></Link>
                        <Link><i className="fa-brands fa-skype hover:text-[--red]"></i></Link>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ConTable;
