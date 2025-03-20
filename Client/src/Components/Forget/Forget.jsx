import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Loader from "../Loader/Loader";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(0); // 0: Initial, 1: OTP Sent, 2: OTP Verified

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "otp":
        setOTP(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (action) => {
    setIsLoading(true);
    try {
      let endpoint = "";
      let message = "";
      switch (action) {
        case "generateOTP":
          endpoint =
            "https://littlefasionserver.vercel.app/api/v1/user/generateAndSendOTP";
          message = "OTP generated successfully";
          break;
        case "verifyOTP":
          endpoint =
            "https://littlefasionserver.vercel.app/api/v1/user/verifyOTP";
          message = "OTP verified successfully";
          break;
        case "updatePassword":
          endpoint =
            "https://littlefasionserver.vercel.app/api/v1/user/updatePassword";
          message = "Password updated successfully";
          break;
        default:
          break;
      }
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(message);
        if (action === "generateOTP") setStep(1);
        else if (action === "verifyOTP") setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        `Failed to ${
          action === "generateOTP"
            ? "generate"
            : action === "verifyOTP"
            ? "verify"
            : "update"
        } OTP`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5">
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Flip
      />
      <div className="space-y-5">
        <input
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
          type={step === 2 ? "password" : "text"}
          name={step === 2 ? "newPassword" : step === 1 ? "otp" : "email"}
          placeholder={
            step === 0 ? "Email" : step === 1 ? "Enter OTP" : "New Password"
          }
          value={step === 0 ? email : step === 1 ? otp : newPassword}
          onChange={handleInputChange}
        />
        <button
          onClick={() =>
            handleSubmit(
              step === 0
                ? "generateOTP"
                : step === 1
                ? "verifyOTP"
                : "updatePassword"
            )
          }
          type="submit"
          disabled={isLoading}
          className="uppercase bg-black hover:bg-[--red] py-[max(1vw,1rem)] text-white text-[max(1vw,1rem)] rounded-[max(2vw,10rem)] w-full"
        >
          {isLoading ? (
            <Loader />
          ) : step === 0 ? (
            "Generate OTP"
          ) : step === 1 ? (
            "Verify OTP"
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </div>
  );
};

export default Forget;
