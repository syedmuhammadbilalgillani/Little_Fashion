import React from 'react'

function Input({ type, label, value, onChange }) {
    return (
        <>

            <div className="relative">
                <input type={type} value={value} onChange={onChange} className=" rounded-[.3vw] block px-[max(0.6vw,0.6rem)] pb-[max(0.6vw,0.6rem)] pt-[max(1vw,1rem)] w-full text-[max(1vw,1rem)] text-gray-900 bg-transparent  border border-gray-300  dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " />
                <label className="absolute text-[max(1vw,1rem)] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-[max(1vw,1rem)] scale-75 t-[max(0.5vw,0.5rem)] z-10 origin-[0]  px-[max(0.6vw,0.6rem)] peer-focus:px-[max(0.6vw,0.6rem)] peer-focus:text-black peer-focus:bg-white peer-focus:dark:bg-gray-800 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{label}</label>
            </div>



        </>
    )
}

export default Input