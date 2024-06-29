import React from 'react'
import { Link } from 'react-router-dom'
import imgsec1 from '../TabOne.jpeg'

function TabOne() {
    return (
        <>
            <section className="grid grid-cols-12 gap-[max(1.2vw,1.2rem)] ">
                <div className="col-span-6 xs:col-span-12 sm:col-span-12  ">
                    <div>
                        <img src={imgsec1} className="w-screen" alt="" />
                    </div>
                </div>
                <div className="col-span-6 xs:col-span-12 sm:col-span-12">
                    <div className="space-y-3 flex justify-between flex-col h-full">
                        <div className=''>

                            <div className=" font-bold text-[max(1.9vw,1.9rem)] text-black dark:text-white">
                                <h2 className="">Good <span className="text-[--red]">Design</span>
                                </h2>
                                <h2>Ideas for <span className="text-[--red]">yourfashion</span></h2>
                            </div>
                            <div className="text-[max(1.2vw,1.2rem)] text-gray-500 dark:text-white space-y-3">
                                <p>Little Fashion templates comes with sign in /sign up pages, product listing / product detail, about, FAQs, and contact page.
                                </p>
                                <p>
                                    Since this HTML template is based on Boostrap 5 CSS library, you can feel free to add more components as you need.
                                </p>
                            </div>


                        </div>
                        <div className="text-gray-500  item dark:text-white  transition-all ease-in-out duration-75 flex items-center gap-2">
                            <Link to='/story' className="hover:text-orange-500 text-[max(.9vw,.9rem)]">LEARN MORE ABOUT US</Link>
                            <i className="fa-thin fa-arrow-right-long icon opacity-0 text-[max(.9vw,.9rem)]" ></i>
                        </div>


                    </div>
                </div>
            </section>
        </>
    )
}

export default TabOne