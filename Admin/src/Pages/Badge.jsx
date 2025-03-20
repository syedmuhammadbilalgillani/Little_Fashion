import React, { useEffect, useState } from "react";
import Modal from "../Components/Modal/Modal";
import axios from "axios";

const Badge = () => {
  const [badgeName, setBadgeName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [badges, setBadges] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const res = await axios.get(
        "https://littlefasionserver.vercel.app/api/v1/badge/readBadge"
      );
      setBadges(res.data);
    } catch (err) {
      console.error("Error fetching badges:", err);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setError(""); // Clear any previous errors when closing the modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://littlefasionserver.vercel.app/api/v1/badge/createBadge",
        { name: badgeName }
      );
      setBadgeName(""); // Clear input field after submission
      fetchBadges(); // Fetch badges again to update the list
      closeModal(); // Close modal after successful submission
    } catch (error) {
      console.error("Error:", error);
      setError("Error creating badge. Please try again."); // Set error message for user feedback
    }
  };

  const handleDelete = async (badgeId) => {
    try {
      await axios.delete(
        `https://littlefasionserver.vercel.app/api/v1/badge/deleteBadge/${badgeId}`
      );
      fetchBadges(); // Fetch badges again to update the list after deletion
    } catch (error) {
      console.error("Error:", error);
      setError("Error deleting badge. Please try again."); // Set error message for user feedback
    }
  };

  const handleChange = (e) => {
    setBadgeName(e.target.value);
  };

  return (
    <>
      <button
        className="bg-green-500 px-4 py-1 my-5 text-white hover:bg-green-400 rounded-md"
        onClick={openModal}
      >
        <i
          className="fa-duotone fa-plus mr-2"
          style={{
            "--fa-primary-opacity": 0,
            "--fa-secondary-color": "#ffffff",
            "--fa-secondary-opacity": 1,
          }}
        ></i>
        Add
      </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Badge ID
              </th>
              <th scope="col" className="px-6 py-3">
                Badge Name
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {badges.map((badge, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {badge._id}
                </th>
                <td className="px-6 py-4">{badge.name}</td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(badge._id)}
                    className="bg-red-500 px-4 py-2 text-white hover:bg-red-400 rounded-md"
                  >
                    Delete
                    <i
                      className="fa-duotone fa-trash-can ml-2"
                      style={{
                        "--fa-secondary-opacity": 0.7,
                      }}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={badgeName}
            onChange={handleChange}
            placeholder="Badge Name"
            className="px-4 py-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:border-blue-500"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            Create Badge
          </button>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Display error message if present */}
        </form>
      </Modal>
    </>
  );
};

export default Badge;
