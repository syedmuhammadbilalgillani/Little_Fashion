import React, { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import Register from "../Components/Register/Register";
import LoginForm from "../Components/LoginForm/LoginForm";
import Forget from "../Components/Forget/Forget";
import Profile from "../Components/Profile/Profile";

function Login() {
    const [register, setregister] = React.useState(false);
    const handleregister = () => setregister((cur) => !cur);
    const [forget, setforget] = React.useState(false);
    const handleforget = () => setforget((cur) => !cur);
    const [token, setToken] = useState(null);
    return (
        <>
            <section className="overflow-hidden">
                <div className="grid grid-cols-1 place-items-center h-screen mx-auto w-full sm:w-[80%] xs:w-full">
                    <div className="col-span-1 my-[max(5vw,5rem)] px-[max(3vw,3rem)]">
                        <h1 className="text-center text-[max(3vw,3rem)] dark:text-white font-extrabold">
                            Login Here
                        </h1>
                        {!token ? (
                            <LoginForm setToken={setToken} />
                        ) : (
                            <Profile token={token} />
                        )}
                        <div className=" mt-[max(1.2vw,1.2rem)]">
                            <div className=" text-[max(1vw,1rem)] text-center dark:text-white">
                                Don’t have an account?{" "}
                                <span
                                    className="cursor-pointer text-[max(1vw,1rem)] hover:text-[--red]"
                                    onClick={handleregister}
                                >
                                    Create One
                                </span>
                            </div>
                            <div className="">
                                <button
                                    onClick={handleforget}
                                    className=" hover:text-[--red] dark:hover:text-[--red] text-[max(1vw,1rem)] text-center dark:text-white"
                                >
                                    Forget password ?
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Dialog
                open={register}
                handler={handleregister}
                className="bg-white dark:bg-gray-800 py-[max(2vw,2rem)]  rounded-[1vw] box-sh w-full outline-none"
            >
                {" "}
                <div>
                    <h1 className="text-[max(2vw,2rem)] text-center dark:text-white font-bold p-2">
                        Register Here
                    </h1>
                    <Register></Register>
                </div>
            </Dialog>
            <Dialog
                open={forget}
                handler={handleforget}
                className="bg-white dark:bg-gray-800 py-[max(2vw,2rem)]  rounded-[1vw] box-sh w-full outline-none"
            >
                {" "}
                <div>
                    <h1 className="text-[max(2vw,2rem)] text-center dark:text-white font-bold p-2">
                        Forget Here
                    </h1>
                    <Forget></Forget>
                </div>
            </Dialog>
        </>
    );
}

export default Login;
