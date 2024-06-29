import React, { useEffect, useState } from "react";
import Modal from "../Components/Modal/Modal";
import axios from "axios";

const Badge = () => {
  const [categoryName, setCategoriesName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://little-fashion-backend.onrender.com/api/v1/category/readCategories"
      );
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
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
        "https://little-fashion-backend.onrender.com/api/v1/category/createCategory",
        { name: categoryName }
      );
      setCategoriesName(""); // Clear input field after submission
      fetchCategories(); // Fetch categories again to update the list
      closeModal(); // Close modal after successful submission
    } catch (error) {
      console.error("Error:", error);
      setError("Error creating badge. Please try again."); // Set error message for user feedback
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(
        `https://little-fashion-backend.onrender.com/api/v1/category/deleteCategory/${categoryId}`
      );
      fetchCategories(); // Fetch categories again to update the list after deletion
    } catch (error) {
      console.error("Error:", error);
      setError("Error deleting badge. Please try again."); // Set error message for user feedback
    }
  };

  const handleChange = (e) => {
    setCategoriesName(e.target.value);
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
                Category ID
              </th>
              <th scope="col" className="px-6 py-3">
                Category Name
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {category._id}
                </th>
                <td className="px-6 py-4">{category.name}</td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(category._id)}
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
        <form onSubmit={handleSubmit} className="flex items-center ">
          <input
            type="text"
            value={categoryName}
            onChange={handleChange}
            placeholder="Category Name"
            className="px-4 py-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Create Badge
          </button>
          {error && <p className="text-red-500 ml-2">{error}</p>}{" "}
          {/* Display error message if present */}
        </form>
      </Modal>
    </>
  );
};

export default Badge;
