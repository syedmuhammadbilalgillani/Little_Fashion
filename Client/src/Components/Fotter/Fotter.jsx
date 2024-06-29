import Card from '../Card/Card'
import React from 'react'
import { Link } from 'react-router-dom';

function Fotter() {
    const Links = [
        { path: "/", li: "Home" },
        { path: "/story", li: "Story" },
        { path: "/product", li: "Products" },
        { path: "/contact", li: "Contact" },
    ];
    return (
        <>
            <footer className='p-[max(5vw,5rem)] xs:p-[max(1.5vw,1.5rem)] 
             overflow-hidden bg-[#282828] dark:bg-gray-950 text-[--p]'>
                <section className='grid grid-cols-12 space-y-6'>
                    <div className="col-span-4 md:col-span-6 sm:col-span-12 xs:col-span-12
                     space-y-7 select-none">
                        <h1 className='hover:text-[--red] text-[max(1.9vw,1.9rem)] font-bold'>Little <span className='text-white'>Fashion</span></h1>
                        <h4 className='text-[max(1vw,1rem)]'>Copyright © 2022 Little Fashion
                        </h4>
                        <h4 className='text-[max(1vw,1rem)]'>  Designed by Tooplate</h4>
                    </div>
                    <div className="col-span-4 md:col-span-6 sm:col-span-12 xs:col-span-12
                     space-y-4 select-none">
                        <h1 className='text-[max(1.5vw,1.5rem)] text-white font-bold'>Sitemap</h1>
                        {Links.map((link, index) => (
                            <ul key={index}>
                                <li>
                                    <Link
                                        to={link.path}
                                        className={`nav relative transition-all duration-300 ease-in-out group hover:text-white`}
                                    >
                                        {link.li}
                                    </Link>
                                </li>
                            </ul>
                        ))}
                    </div>
                    <div className="col-span-4 md:col-span-6 sm:col-span-12 xs:col-span-12 
                     space-y-4">
                        <h1 className='text-[max(1.5vw,1.5rem)] text-white font-bold'>Social</h1>
                        <div className='space-y-4 flex flex-col'>

                            <Link><i className="fa-brands fa-youtube mr-[3%] text-[max(1.2vw,1.2rem)] hover:text-white"></i>Youtube</Link>
                            <Link><i className="fa-brands fa-whatsapp mr-[3%] text-[max(1.2vw,1.2rem)] hover:text-white"></i>Whatsapp</Link>
                            <Link><i className="fa-brands fa-instagram mr-[3%] text-[max(1.2vw,1.2rem)] hover:text-white"></i>Instagram</Link>
                            <Link><i className="fa-brands fa-skype mr-[3%] text-[max(1.2vw,1.2rem)] hover:text-white"></i>Skype</Link>
                        </div>
                    </div>
                </section>

            </footer>
        </>
    )
}

export default Fotter