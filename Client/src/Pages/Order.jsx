import React, { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Order = () => {
  const { cartItems, fetchCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
    transactionId: "",
    transactionName: "",
  });
  const [transactionImage, setTransactionImage] = useState(null);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://littlefasionserver.vercel.app/api/v1/payment/readBankAccountDetails",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setBankAccounts(data.bankAccounts);
      } catch (error) {
        console.error("Error fetching bank account details:", error);
        setError("Internal server error");
      }
    };

    fetchData();
  }, [accessToken]);

  useEffect(() => {
    fetchCart(); // Fetch cart items when the component mounts
  }, [fetchCart]);

  useEffect(() => {
    // Calculate total price when cartItems change
    let totalPrice = 0; // Initialize totalPrice variable
    cartItems.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    setTotalPrice(totalPrice); // Update totalPrice state
  }, [cartItems]);

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAccountSelect = (event) => {
    const selectedIndex = event.target.value;
    setSelectedAccount(bankAccounts[selectedIndex]);
  };
  const handleFileChange = (e) => {
    setTransactionImage(e.target.files[0]);
  };
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const products = cartItems.map(({ product, quantity }) => ({
        productId: product._id,
        productName: product.name,
        quantity,
        price: product.price,
      }));

      const formData = new FormData();
      formData.append("transactionImage", transactionImage);

      // Append other user info fields to the FormData
      Object.entries(userInfo).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(
        "https://littlefasionserver.vercel.app/api/v1/order/checkout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: formData, // Just pass formData directly as the body
        }
      );

      const data = await response.json();

      if (response.ok) {
        document.write(JSON.stringify(data));
        toast.success("Order placed successfully!");
      } else {
        const errorMessage = data.error || "Checkout failed";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Error during checkout. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="max-w-[90%] mx-auto rounded-3xl overflow-hidden p-[3vw]">
        <h1 className="text-3xl font-bold text-center mb-14">Checkout</h1>
        <main className="grid grid-cols-2 gap-10">
          <div className="col-span-1 xs:col-span-2 sm:col-span-2">
            <div className="flex flex-wrap gap-[3vw]">
              {cartItems.map((item, index) => (
                <div
                  className="p-5 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-gray-100 hover:to-orange-200 w-full max-w-[300px]"
                  key={index}
                >
                  <h2 className="text-lg font-semibold mb-2">
                    Product Name: {item.product.name}
                  </h2>
                  <p className="text-gray-700 mb-2">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-gray-700">
                    Price: ${item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-10">
              <h2 className="text-xl font-bold mb-2">
                Total Price: ${totalPrice}
              </h2>
            </div>
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-center mb-8">
                Enter Detail
              </h1>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={userInfo.name}
                onChange={handleUserInfoChange}
                className="w-full border rounded-md py-2 px-3 mb-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={handleUserInfoChange}
                className="w-full border rounded-md py-2 px-3 mb-2"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={userInfo.phone}
                onChange={handleUserInfoChange}
                className="w-full border rounded-md py-2 px-3 mb-2"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={userInfo.address}
                onChange={handleUserInfoChange}
                className="w-full border rounded-md py-2 px-3 mb-2"
              />
            </div>
          </div>
          <div className="col-span-1 xs:col-span-2 sm:col-span-2">
            <div className="my-5">
              <label>
                Payment Method:
                <select
                  name="paymentMethod"
                  className="py-3 w-full outline-none px-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={userInfo.paymentMethod}
                  onChange={handleUserInfoChange}
                >
                  <option value="">Select Payment Method</option>
                  <option value="CashOnDelivery">Cash on Delivery</option>
                  <option value="Online">Online Payment</option>
                </select>
              </label>
              <br />
              {userInfo.paymentMethod === "Online" && (
                <div>
                  <div className="bg-gray-100 p-5 rounded-xl shadow-md my-5">
                    {error && <p className="text-red-500">{error}</p>}
                    <select
                      onChange={handleAccountSelect}
                      className="py-3 w-full outline-none px-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="" className="text-gray-500">
                        Select Payment Type
                      </option>
                      {bankAccounts.map((account, index) => (
                        <option
                          key={index}
                          value={index}
                          className="text-gray-800"
                        >
                          {account.bankAccountName}
                        </option>
                      ))}
                    </select>
                    {selectedAccount && (
                      <div className="py-5 space-y-2 text-lg">
                        <p className="font-bold">
                          Account Name :{" "}
                          <span className="font-light">
                            {selectedAccount.bankAccountName}
                          </span>
                        </p>
                        <p className="font-bold">
                          Account Title :{" "}
                          <span className="font-light">
                            {selectedAccount.accountTitle}
                          </span>
                        </p>
                        <p className="font-bold">
                          Account Number :{" "}
                          <span className="font-light">
                            {selectedAccount.bankAccountNumber}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="my-5">
                    <label>
                      Transaction ID:
                      <input
                        type="text"
                        name="transactionId"
                        className="w-full border rounded-md py-2 px-3 mb-2"
                        value={userInfo.transactionId}
                        onChange={handleUserInfoChange}
                        required
                      />
                    </label>
                    <br />
                    <label>
                      Transaction Name:
                      <input
                        type="text"
                        className="w-full border rounded-md py-2 px-3 mb-2"
                        name="transactionName"
                        value={userInfo.transactionName}
                        onChange={handleUserInfoChange}
                        required
                      />
                    </label>

                    <br />
                    <input type="file" onChange={handleFileChange} />
                  </div>
                </div>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5"
                onClick={handleCheckout}
                disabled={loading || cartItems.length === 0}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Order;
