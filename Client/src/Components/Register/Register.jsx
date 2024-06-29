import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/port/api/v1/user/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();
            if (response.ok) {
                toast.success(responseData.message);
                setFormData({ username: "", email: "", password: "" });
            } else {
                toast.error(responseData.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1">
            <div className="col-span-1 px-[max(1vw,1rem)] xs:padding-x-0-1 overflow-hidden p-2">
                <ToastContainer position="top-center" autoClose={500} hideProgressBar={false} newestOnTop={false}
                    closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" transition:Flip />
                <form onSubmit={handleSubmit} className="w-full space-y-[1vw]">
                    {["username", "email", "password"].map((field) => (
                        <div key={field} className="relative z-0">
                            <input type={field === "password" && !passwordVisible ? "password" : "text"} name={field}
                                value={formData[field]} onChange={handleChange} required
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                                placeholder={` `} />
                            <label htmlFor={field} className="absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            {field === "password" && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={togglePasswordVisibility}>
                                    <i className={`text-gray-500 z-[9999] dark:text-white cursor-pointer ${passwordVisible
                                        ? "fa-duotone fa-eye-slash"
                                        : "fa-solid fa-eye"
                                        }`} />
                                </div>
                            )}
                        </div>
                    ))}
                    <button type="submit" disabled={isLoading}
                        className="uppercase bg-black hover:bg-[--red]  py-[max(1vw,1rem)]  text-white text-[max(1vw,1rem)] rounded-[max(2vw,10rem)] w-full">
                        {isLoading ? (
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin"
                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor" />
                            </svg>
                        ) : null}
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
