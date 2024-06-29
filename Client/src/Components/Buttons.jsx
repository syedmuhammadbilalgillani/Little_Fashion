import React from "react";

const Buttons = () => {
    return (
        <>
            <main className=" p-20 bg-slate-100 dark:bg-slate-400 h-auto">
                <div className="text-end">
                    <button>Logout</button>
                </div>
                <section className="grid grid-cols-3 gap-[2vw] h-[70svh] place-content-center ">
                    <div className="col-span-1 sm:col-span-2 bg-slate-200 p-4 rounded-xl ">
                        <div className="flex flex-col justify-between items-center h-full">


                            <div className="flex flex-col items-center gap-[1vw] relative z-0 ">
                                <div className="relative rounded-[50%] h-40 w-40 bg-green-200">
                                    <img
                                        src=""
                                        className="outline-none h-full w-full rounded-[50%]"
                                        alt=""
                                    />
                                    <i className="absolute top-1 text-black right-4 fa-solid text-2xl fa-circle-plus"></i>
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        value={"Syed Bilal"}
                                        className="bg-transparent outline-none border-none text-center"
                                    />
                                </div>
                            </div>
                            <div>
                                <button>update image</button></div></div>
                    </div>
                    <div className="col-span-1 sm:col-span-2 bg-slate-200 p-10 rounded-xl">
                        <div className="space-y-5">
                            <div className="relative z-0">
                                <input
                                    type="username"
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="username"
                                    className="absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Username
                                </label>
                            </div>
                            <div className="relative z-0">
                                <input
                                    type="email"
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Email
                                </label>
                            </div>
                            <div className="relative z-0">
                                <input
                                    type="phone"
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="phone"
                                    className="absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Phone
                                </label>
                            </div>
                            <div className="relative z-0">
                                <textarea
                                    rows={4}
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}

                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                                    placeholder=" "
                                ></textarea>
                                <label
                                    htmlFor="text"
                                    className="absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Address
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 sm:col-span-2 bg-slate-200 p-10 rounded-xl">
                        <h1 className="text-center">Order</h1>
                    </div>


                </section>

            </main>
        </>
    );
};

export default Buttons;
