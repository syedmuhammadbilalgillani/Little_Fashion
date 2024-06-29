import React, { useEffect, useState } from "react";
import Modal from "../Components/Modal/Modal";
import axios from "axios";

const BankDetails = () => {
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [accountTitle, setAccountTitle] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const fetchBankAccounts = async () => {
    try {
      const res = await axios.get(
        "https://little-fashion-backend.onrender.com/api/v1/payment/readBankAccountDetailsadmin"
      );
      setBankAccounts(res.data.bankAccounts);
    } catch (err) {
      console.error("Error fetching bank accounts:", err);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setError("");
  };

  const handleCreateBankAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://little-fashion-backend.onrender.com/api/v1/payment/createBankDetails",
        {
          bankAccountName: bankAccountName,
          bankAccountNumber: bankAccountNumber,
          accountTitle: accountTitle,
        }
      );
      setBankAccountName("");
      setBankAccountNumber("");
      setAccountTitle("");
      fetchBankAccounts();
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      setError("Error creating bank account. Please try again.");
    }
  };

  const handleDeleteBankAccount = async (bankAccountId) => {
    try {
      await axios.delete(
        `https://little-fashion-backend.onrender.com/api/v1/payment/deleteBankAccount/${bankAccountId}`
      );
      fetchBankAccounts();
    } catch (error) {
      console.error("Error:", error);
      setError("Error deleting bank account. Please try again.");
    }
  };

  return (
    <>
      <button
        className="bg-green-500 px-4 py-1 my-5 text-white hover:bg-green-400 rounded-md"
        onClick={openModal}
      >
        Add Bank Account
      </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Bank Account Name
              </th>
              <th scope="col" className="px-6 py-3">
                Bank Account Number
              </th>
              <th scope="col" className="px-6 py-3">
                Account Title
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((bankAccount, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">{bankAccount.bankAccountName}</td>
                <td className="px-6 py-4">{bankAccount.bankAccountNumber}</td>
                <td className="px-6 py-4">{bankAccount.accountTitle}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteBankAccount(bankAccount._id)}
                    className="bg-red-500 px-4 py-2 text-white hover:bg-red-400 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <form onSubmit={handleCreateBankAccount} className="p-4 ">
          <div className="mb-4">
            <label
              htmlFor="bankAccountName"
              className="block text-gray-700 font-semibold"
            >
              Bank Account Name
            </label>
            <input
              type="text"
              id="bankAccountName"
              value={bankAccountName}
              onChange={(e) => setBankAccountName(e.target.value)}
              placeholder="Enter bank account name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bankAccountNumber"
              className="block text-gray-700 font-semibold"
            >
              Bank Account Number
            </label>
            <input
              type="text"
              id="bankAccountNumber"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              placeholder="Enter bank account number"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="accountTitle"
              className="block text-gray-700 font-semibold"
            >
              Account Title
            </label>
            <input
              type="text"
              id="accountTitle"
              value={accountTitle}
              onChange={(e) => setAccountTitle(e.target.value)}
              placeholder="Enter account title"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Create Bank Account
          </button>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
      </Modal>
    </>
  );
};

export default BankDetails;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const BankAccountForm = () => {
//     const [formData, setFormData] = useState({
//         bankAccountName: '',
//         bankAccountNumber: '',
//         accountTitle: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('https://little-fashion-backend.onrender.com/api/v1/payment/createBankDetails', formData);
//             const { data } = response;
//             toast.success(data.message);
//             setFormData({
//                 bankAccountName: '',
//                 bankAccountNumber: '',
//                 accountTitle: ''
//             });
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || 'An error occurred while processing your request.';
//             toast.error(errorMessage);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
//             <h2 className="text-2xl mb-4 text-center">Create Bank Account Details</h2>
//             <form onSubmit={handleSubmit}>
//                 {Object.entries(formData).map(([key, value]) => (
//                     <div className="mb-4" key={key}>
//                         <label className="block text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}:</label>
//                         <input
//                             type="text"
//                             name={key}
//                             value={value}
//                             onChange={handleChange}
//                             className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
//                             required
//                         />
//                     </div>
//                 ))}
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
//                     Submit
//                 </button>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// };

// export default BankAccountForm;
