import React from 'react'
import { Link } from 'react-router-dom'


function TabTwo() {
    return (
        <>

            <section className="grid grid-cols-12 gap-[max(1.2vw,1.2rem)]">
                <div className="col-span-6 xs:col-span-12 sm:col-span-12  ">
                    <div className="">
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/f_7JqPDWhfw?controls=0"
                            className='aspect-video w-full'
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                </div>
                <div className="col-span-6 xs:col-span-12 sm:col-span-12">
                    <div className="space-y-3 flex flex-col justify-between h-full">
                        <div>
                            <div className=" font-bold text-[max(1.9vw,1.9rem)] text-black dark:text-white">

                                <h2>Life at Studio</h2>
                            </div>
                            <div className="text-[max(1.2vw,1.2rem)] text-gray-500 dark:text-white space-y-3">
                                <p>Over three years in business, We’ve had the chance to work on a variety of projects, with companies
                                </p>
                                <p>
                                    Custom work is branding, web design, UI/UX design
                                </p>
                            </div>

                        </div>

                        <div className="text-gray-500 item dark:text-white transition-all ease-in-out duration-75 flex items-center gap-2">
                            <Link to='/contact' className="hover:text-orange-500 text-[max(.9vw,.9rem)]">WORK WITH US</Link>
                            <i className="fa-thin fa-arrow-right-long icon text-[max(.9vw,.9rem)] opacity-0" ></i>
                        </div>


                    </div>
                </div>
            </section></>
    )
}

export default TabTwo