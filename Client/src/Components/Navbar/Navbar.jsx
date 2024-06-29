// Navbar.js

import React, { useEffect, useState, lazy } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeProvider } from "../../context/theme.js";
import { useCart } from "../../context/cartContext.jsx";
const ThemeBtn = lazy(() => import("../ThemeBtn/ThemeBtn.jsx"));

function Navbar() {
    const location = useLocation();
    const token = localStorage.getItem("accessToken");
    const { cartItemCount } = useCart();

    const Links = [
        { path: "/", li: "Home" },
        { path: "/story", li: "Story" },
        { path: "/product", li: "Products" },
        { path: "/contact", li: "Contact" },
    ];

    const [isHidden, setIsHidden] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setIsHidden(prevScrollPos < currentScrollPos && currentScrollPos > 70);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    const [themeMode, setThemeMode] = useState(() => {
        return localStorage.getItem("themeMode") || "light";
    });

    const [isTranslated, setIsTranslated] = useState(true);
    const [isToggleActive, setIsToggleActive] = useState(false); // State to track toggle activation

    const lightTheme = () => {
        setThemeMode("light");
    };

    const darkTheme = () => {
        setThemeMode("dark");
    };

    const toggleMenu = () => {
        setIsTranslated(!isTranslated); // Toggle translation on each click
        setIsToggleActive(!isToggleActive); // Toggle activation state
    };

    // Automatically hide and translate navbar on scroll for small and extra-small screens
    useEffect(() => {
        const handleScrollForMobile = () => {
            const currentScrollPos = window.pageYOffset;
            const isMobileScreen = window.innerWidth < 768; // Check if it's small or extra-small screen
            setIsHidden(prevScrollPos < currentScrollPos && currentScrollPos > 70);
            setIsTranslated(isMobileScreen ? prevScrollPos < currentScrollPos : true);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScrollForMobile);

        return () => {
            window.removeEventListener("scroll", handleScrollForMobile);
        };
    }, [prevScrollPos]);

    useEffect(() => {
        localStorage.setItem("themeMode", themeMode);
    }, [themeMode]);

    useEffect(() => {
        document.querySelector("html").classList.remove("light", "dark");
        document.querySelector("html").classList.add(themeMode);
    }, [themeMode]);

    return (
        <>
            <nav
                className={`dark:bg-gray-700 bg-slate-100 dark:text-white text-[--p] shadow-lg px-[7%] xs:px-[8%] py-5  ease-in-out fixed top-0 transition-all duration-300 ${isHidden && !isToggleActive
                    ? "-translate-y-full w-full"
                    : "translate-y-0 z-[999] w-full "
                    }`}
            >
                <div className="flex items-center justify-between flex-wrap">
                    <div className="hidden xs:block sm:block">
                        <button onClick={toggleMenu}>
                            <i className="fa-light fa-bars fa-lg"></i>
                        </button>
                    </div>

                    <div className="text-[max(1.8vw,28px)] xs:text-[max(5.5vw,20px)] overflow-hidden">
                        <Link to="/">
                            <strong className="text-black dark:text-white font-semibold  ">
                                <span className="text-[--red]">Little</span> Fashion
                            </strong>
                        </Link>
                    </div>

                    <ul className="flex gap-7 text-[max(.9vw,18px)] sm:hidden xs:hidden">
                        {Links.map((link, index) => (
                            <li
                                key={index}
                                className={`${location.pathname === link.path ? "text-red-500" : ""
                                    }`}
                            >
                                <Link
                                    to={link.path}
                                    className={`nav relative transition-all duration-300 ease-in-out group hover:text-red-500`}
                                >
                                    {link.li}
                                    <div className="absolute left-0 w-full h-[1.5px] bg-[--p] dark:bg-slate-300 origin-bottom transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-[max(1vw,10px)] text-[max(1.1vw,20px)] items-center">

                        <Link
                            to="/login"
                            className="fa-light fa-user hover:text-[--red]"
                        ></Link>
                        {token && (
                            <Link
                                to="/cart"
                                className="relative">

                                <i className="fa-light fa-bag-shopping hover:text-[--red]"></i>
                                {cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">{cartItemCount}</span>}
                            </Link>
                        )}{" "}
                        <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
                            <ThemeBtn />
                        </ThemeProvider>
                    </div>
                </div>
            </nav>

            <div className={`px-5 xs:block sm:block absolute z-[998] top-0 mt-[5.4rem] left-0 w-full transition-transform duration-300 ${isToggleActive ? "translate-x-0" : "-translate-x-full"
                }`}>
                <ul
                    className={`flex flex-col justify-center w-full items-center p-2 text-[max(1vw,18px)] transition-all ease-in-out duration-100 bg-[#fffefebc] dark:bg-[#414141bb] dark:text-white  dark:shadow-lg gap-2 rounded-3xl`}
                >
                    {Links.map((link, index) => (
                        <li
                            key={index}
                            className={`${location.pathname === link.path ? "text-red-500" : ""
                                } hover:bg-white dark:hover:bg-stone-200 dark:hover:text-red-500 w-full text-center rounded-2xl py-2`}
                        >
                            <Link
                                to={link.path}
                                className={`nav relative transition-all  duration-300 ease-in-out group hover:text-red-500`}
                            >
                                {link.li}
                                <div className="absolute left-0 w-full h-[1.5px] bg-[--p] dark:bg-black origin-bottom transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="py-[1.4vw]">o</div>
        </>
    );
}

export default Navbar;
