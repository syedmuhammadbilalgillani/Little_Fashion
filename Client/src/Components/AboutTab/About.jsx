import React, { useState } from "react";
const TabOne = React.lazy(() => import("./TabOne/TabOne"));
const TabTwo = React.lazy(() => import("./TabTwo/TabTwo"));
const TabThree = React.lazy(() => import("./TabThree/TabThree"));

function About() {
    const [activeTab, setActiveTab] = useState(1);

    const changeTab = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <>
            <section className=" px-[8%] py-[15vh] overflow-hidden " >
                <h1
                    className="text-center font-b font-sans dark:text-white font-extrabold overflow-clip py-[3vw]"
                >
                    Get started with <span className="text-[--red] font-b">Little</span>{" "}
                    Fashion
                </h1>
                <div
                    className="grid grid-cols-12 place-items-center
                        sm:place-items-start xs:place-items-start "data-aos="zoom-out-down"
                    data-aos-duration="600"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="false"
                >
                    <div className="col-span-2 xs:col-span-12 sm:col-span-12 ">
                        <div className="flex flex-col  text-[--grey] dark:text-white text-[max(1vw,1rem)]">
                            <button
                                className={`${activeTab === 1
                                    ? "border-l-2 border-[--red] text-[--red]"
                                    : ""
                                    } focus:outline-none py-4 text-start px-3 hover:text-[--red] font-semibold  `}
                                onClick={() => changeTab(1)}
                            >
                                Introduction
                            </button>
                            <button
                                className={`${activeTab === 2
                                    ? "border-l-2 border-[--red] text-[--red]"
                                    : ""
                                    } focus:outline-none py-4 text-start px-3 hover:text-[--red] font-semibold  `}
                                onClick={() => changeTab(2)}
                            >
                                How we work?
                            </button>
                            <button
                                className={`${activeTab === 3
                                    ? "border-l-2 border-[--red] text-[--red]"
                                    : ""
                                    } focus:outline-none py-4 text-start px-3 hover:text-[--red] font-semibold  `}
                                onClick={() => changeTab(3)}
                            >
                                Capabilites
                            </button>
                        </div>
                    </div>
                    <div className="col-span-10 xs:col-span-12 sm:col-span-12 ">
                        {activeTab === 1 && <TabOne />}
                        {activeTab === 2 && <TabTwo />}
                        {activeTab === 3 && <TabThree />}
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;
