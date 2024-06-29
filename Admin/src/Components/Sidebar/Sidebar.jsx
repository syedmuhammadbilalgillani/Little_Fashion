import React, { useState } from "react";

import logo from "../../assets/logo.svg";
import dashboard from "../../assets/dashboard.svg";
import team from "../../assets/team.svg";
import talent from "../../assets/talent.svg";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from '../../context/ThemeContext';
function Sidebar() {
    const { isActive, toggleClass } = useTheme();

    const navLinks = [
        { icon: " fa-users", path: '/', name: 'Users' },
        { icon: " fa-layer-plus", path: '/product', name: 'Product' },
        { icon: " fa-bags-shopping", path: '/orders', name: 'Orders' },
        { icon: "fa-layer-group", path: '/category', name: 'Category' },
        { icon: "fa-badge", path: '/badge', name: 'Badge' },
        { icon: "fa-credit-card", path: '/createBankAccountDetails', name: 'Bank Details' },
        { icon: "fa-rectangle-list", path: '/contactForm', name: 'Contact Form' },

    ];
    return (
        <>
            <aside
                className={` h-full max-w-full  fixed p-2  transition-all ${isActive ? "w-[12rem] " : "w-[5rem] "
                    }`}
            >
                <nav className="bg-slate-200 h-full w-full rounded-xl overflow-hidden">
                    <div
                        className={`flex items-center gap-3 py-3 px-4 select-none`}
                    >
                        <>
                            <i className="fa-duotone text-4xl  fa-user-tie-hair"></i>
                        </>
                        <span className={` ${isActive ? "block" : "hidden"}`}>ADMIN</span>
                    </div>
                    <button
                        className="absolute flex bg-gray-500 text-white
                       shadow-2xl right-[-.8em] top-6
                          p-1 rounded-full px-2"
                        onClick={toggleClass}
                    >
                        @
                    </button>
                    <div className={`bg-gray-700 h-0.5 mx-2 rounded-full   ${isActive ? "hidden " : "block"}`}></div>
                    {navLinks.map((nav, index) => (
                        <ul key={index}>
                            <li className="hover:bg-slate-50 rounded-lg mx-2" >
                                <Link to={nav.path} className={`flex items-center gap-2 py-2 px-[.5rem]`}>
                                    <div className={`fa-duotone ${nav.icon} text-2xl`}></div>
                                    <span className={` ${isActive ? "block" : "hidden"}`}>
                                        {nav.name}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    ))}

                </nav>
            </aside>



        </>
    );
}

export default Sidebar;
