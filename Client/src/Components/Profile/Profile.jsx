import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [editedProfileData, setEditedProfileData] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
      return;
    }
    fetchProfileData();
    fetchOrders();
  }, [accessToken]);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        "https://littlefasionserver.vercel.app/api/v1/user/profile",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!response.ok) {
        handleResponseError(response.status);
        return;
      }
      const responseData = await response.json();
      setProfileData(responseData.user);
      setEditedProfileData({ ...responseData.user });
    } catch (error) {
      toast.error("Failed to fetch profile data");
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://littlefasionserver.vercel.app/api/v1/order/readOrders",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text(); // Extracting error message from response
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () =>
        setEditedProfileData((prevData) => ({
          ...prevData,
          profilePicture: reader.result,
        }));
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await fetch(
        "https://littlefasionserver.vercel.app/api/v1/user/avatar",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      fetchProfileData();
      toast.success(responseData.message || "Avatar updated successfully");
    } catch (error) {
      toast.error(error.message || "Error updating file");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://littlefasionserver.vercel.app/api/v1/user/update",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedProfileData),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update profile");
      }
      toast.success(responseData.message || "Profile updated successfully");
      setProfileData(responseData.user);
    } catch (error) {
      toast.error(error.message || "Error updating profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const handleFieldChange = (key, value) => {
    setEditedProfileData((prevData) => ({ ...prevData, [key]: value }));
  };

  const isProfileEdited =
    editedProfileData &&
    Object.keys(editedProfileData).some(
      (key) => editedProfileData[key] !== profileData[key]
    );

  const handleOpen = (index) => {
    setOpen(open === index ? null : index);
  };

  const handleResponseError = (status) => {
    if (status === 401) {
      localStorage.removeItem("accessToken");
      navigate("/");
    } else {
      toast.error("Failed to fetch data");
    }
  };

  return (
    <>
      <div className="overflow-scroll py-[10vh] px-[5vw] ">
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
        />
        {profileData && (
          <main className=" xs:p-1  ">
            <form
              onSubmit={handleUpdateProfile}
              className="space-y-5 max-w-4xl mx-auto"
            >
              {isLoading && <Loader />}
              <div className="text-right">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
              <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 place-content-center">
                <div className="sm:col-span-1 flex-col gap-10 bg-slate-200 p-4 rounded-xl flex justify-center items-center">
                  <label
                    htmlFor="file"
                    className=" cursor-pointer  h-40 w-40 rounded-full"
                  >
                    <img
                      src={
                        editedProfileData.profilePicture || "default-image-url"
                      }
                      alt="Profile"
                      className="rounded-full "
                    />
                  </label>

                  <input
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {file && (
                    <button
                      onClick={handleSubmit}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mt-4 rounded"
                    >
                      Update Image
                    </button>
                  )}
                </div>
                <div className="sm:col-span-2 bg-slate-200 p-4 rounded-xl">
                  <div className="space-y-5">
                    {[
                      "name",
                      "email",
                      "username",
                      "phoneNumber",
                      "address",
                    ].map((field) => (
                      <div key={field}>
                        <label
                          htmlFor={field}
                          className="text-sm font-semibold"
                        >
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                          type="text"
                          id={field}
                          value={editedProfileData[field]}
                          onChange={(e) =>
                            handleFieldChange(field, e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    ))}
                    {isProfileEdited && (
                      <button
                        onClick={handleUpdateProfile}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                      >
                        Update Profile
                      </button>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-3 bg-slate-200 p-4 rounded-xl">
                  <div className="max-w-4xl mx-auto mt-8">
                    <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
                    {orders.map((order, index) => (
                      <Accordion
                        key={order._id}
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className={`${
                              index === open ? "rotate-180" : ""
                            } h-5 w-5 transition-transform`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        }
                        open={open === index}
                        animate={CUSTOM_ANIMATION}
                        className=""
                      >
                        <AccordionHeader onClick={() => handleOpen(index)}>
                          <p className="overflow-clip">Order: {order._id}</p>
                        </AccordionHeader>
                        <AccordionBody>
                          <div className="order-details">
                            <ul className="list-disc ml-4 mb-2">
                              {order.products.map((product, productIndex) => (
                                <li
                                  key={`${product.product}-${productIndex}`}
                                  className="border rounded-lg p-4 mb-4"
                                >
                                  <div className="text-lg font-bold mb-2">
                                    {product.productName}
                                  </div>
                                  <div className="flex justify-between">
                                    <div className="text-gray-600">
                                      Quantity: {product.quantity}
                                    </div>
                                    <div className="text-gray-600">
                                      Price: ${product.price}
                                    </div>
                                  </div>
                                  <div className="text-gray-600 mt-2">
                                    Total Price: ${product.totalPrice}
                                  </div>
                                </li>
                              ))}
                            </ul>
                            <div className="mb-2">
                              <span className="font-bold">Status:</span>{" "}
                              {order.status}
                            </div>
                            <div className="mb-2">
                              <span className="font-bold">Total Price:</span>{" "}
                              {order.totalPrice}
                            </div>
                            <div className="mb-2">
                              {order.payment.transactionType === "Online" ? (
                                <>
                                  <p>
                                    <span className="font-bold">
                                      Transaction Type:
                                    </span>{" "}
                                    {order.payment.transactionType}
                                  </p>
                                  <p>
                                    <span className="font-bold">
                                      Transaction ID:
                                    </span>{" "}
                                    {order.payment.transactionId}
                                  </p>
                                  <p>
                                    <span className="font-bold">
                                      Bank Account Name:
                                    </span>{" "}
                                    {order.payment.bankAccountName}
                                  </p>
                                </>
                              ) : (
                                <p>
                                  <span className="font-bold">
                                    Transaction Type:
                                  </span>{" "}
                                  {order.payment}
                                </p>
                              )}
                            </div>
                            <div>
                              <span className="font-bold">Created At:</span>{" "}
                              {new Date(order.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </AccordionBody>
                      </Accordion>
                    ))}
                  </div>
                </div>
              </section>
            </form>
          </main>
        )}
      </div>
    </>
  );
}

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export default Profile;
