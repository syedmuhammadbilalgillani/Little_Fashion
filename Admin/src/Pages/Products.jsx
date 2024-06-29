import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Components/Modal/Modal";
import { Table } from "flowbite-react";
import fileUploadSVG from "../assets/upload-file-svgrepo-com.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const initialFormData = {
    name: "",
    description: "",
    price: "",
    images: [],
    badgeName: "",
    categoryName: "",
  };
  const [badgeId, setBadgeId] = useState("");
  const [badges, setBadges] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetchData(
      "https://little-fashion-backend.onrender.com/api/v1/badge/readBadge",
      setBadges
    );
    fetchData(
      "https://little-fashion-backend.onrender.com/api/v1/category/readCategories",
      setCategories
    );
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!editModalOpen) {
      fetchProducts();
    }
  }, [editModalOpen]);

  const fetchData = async (url, setter) => {
    try {
      const res = await axios.get(url);
      setter(res.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://little-fashion-backend.onrender.com/api/v1/product/read"
      );
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "No Record";
  };

  const getBadgeName = (badgeId) => {
    const badge = badges.find((badge) => badge._id === badgeId);
    return badge ? badge.name : "No Record";
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "badgeId") {
      const badge = badges.find((badge) => badge._id === value);
      setBadgeId(value);
      setFormData({ ...formData, badgeName: badge ? badge.name : "" });
    } else if (name === "categoryId") {
      const category = categories.find((category) => category._id === value);
      setCategoryId(value);
      setFormData({ ...formData, categoryName: category ? category.name : "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("badgeId", badgeId);
    formDataToSend.append("categoryId", categoryId);

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "badgeName" && key !== "categoryName")
        formDataToSend.append(key, value);
    });

    for (let i = 0; i < formData.images.length; i++) {
      formDataToSend.append("images", formData.images[i]);
    }

    try {
      const response = await axios.post(
        "https://little-fashion-backend.onrender.com/api/v1/product/create",
        formDataToSend
      );
      if (response.status === 201) {
        fetchProducts();
        toast.success("Product created successfully");
        setFormData(initialFormData);
      } else {
        throw new Error("An error occurred. Please try again later.");
      }
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data.message
          : "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `https://little-fashion-backend.onrender.com/api/v1/product/deleteById/${productId}`
      );
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(
        "An error occurred while deleting product. Please try again later."
      );
    }
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleEditModalOpen = (productId) => {
    setEditProductId(productId);
    setEditModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <ToastContainer />
      {loading && (
        <div className="fixed top-0 left-0 z-[99] w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <Modal
        isOpen={addModalOpen}
        onClose={handleAddModalClose}
        setError={setError}
      >
        <form onSubmit={handleSubmit} className="w-[40vw] xs:w-full">
          {["name", "description", "price"].map((field) => (
            <div className="mb-6" key={field}>
              <label
                htmlFor={field}
                className="block text-gray-700 font-bold mb-2"
              >
                {field[0].toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "price" ? "number" : "text"}
                name={field}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
          <div className="mb-6">
            <label
              htmlFor="images"
              className="block text-gray-700 font-bold mb-2"
            >
              Images
            </label>
            <input
              type="file"
              name="images"
              id="images"
              onChange={handleImageChange}
              multiple
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="badgeId"
              className="block text-gray-700 font-bold mb-2"
            >
              Select Badge
            </label>
            <select
              id="badgeId"
              value={badgeId}
              onChange={handleChange}
              name="badgeId"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Badge</option>
              {badges.map((badge) => (
                <option key={badge._id} value={badge._id}>
                  {badge.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="categoryId"
              className="block text-gray-700 font-bold mb-2"
            >
              Select Category
            </label>
            <select
              id="categoryId"
              value={categoryId}
              onChange={handleChange}
              name="categoryId"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              onClick={handleAddModalClose}
              className="px-3 py-2 rounded-md bg-red-500 text-white mx-2"
            >
              Close
            </button>
          </div>
        </form>
      </Modal>

      {loading && (
        <div className="fixed h-screen w-full flex justify-center items-center top-0">
          <div className="spinner"></div>
        </div>
      )}

      <button
        className="bg-green-500 px-4 py-1 text-white hover:bg-green-400 rounded-md"
        onClick={handleAddModalOpen}
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

      <div className="overflow-x-auto my-10">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Badge</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products.map((product) => (
              <Table.Row key={product._id}>
                <Table.Cell>
                  <img className="h-24" src={product.images[0]} alt="" />
                </Table.Cell>
                <Table.Cell>{product.name || "No Record"}</Table.Cell>
                <Table.Cell>{product.description || "No Record"}</Table.Cell>
                <Table.Cell>{product.price || "No Record"}</Table.Cell>
                <Table.Cell>{getCategoryName(product.categoryId)}</Table.Cell>
                <Table.Cell>{getBadgeName(product.badgeId)}</Table.Cell>
                <Table.Cell>
                  <button onClick={() => handleEditModalOpen(product._id)}>
                    <i className="fa-duotone fa-file-pen text-xl"></i>
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <Modal
        isOpen={editModalOpen}
        onClose={handleEditModalClose}
        setError={setError}
      >
        <EditProducts
          badges={badges}
          categories={categories}
          productId={editProductId}
          handleEditModalClose={handleEditModalClose}
        />
      </Modal>
    </>
  );
};

export function EditProducts({
  productId,
  handleEditModalClose,
  badges,
  categories,
}) {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    badgeId: "",
    categoryId: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorFetching, setErrorFetching] = useState(false);
  const [loading, setLoading] = useState(false); // Step 1: Define loading state

  const handleFileChange = (event) => {
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    setLoading(true); // Start loading

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("image", file));

      const response = await fetch(
        `https://little-fashion-backend.onrender.com/api/v1/product/${productId}/image`,
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message);
        return;
      }

      toast.success(responseData.message);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false); // Stop loading
      setSelectedFiles([]); // Clear selected files after upload
    }
  };

  const handleRemoveImage = async (imageIndex) => {
    try {
      const response = await axios.delete(
        `https://little-fashion-backend.onrender.com/api/v1/product/${productId}/images/${imageIndex}`
      );
      if (response.status === 200) {
        const updatedImages = [...productData.images];
        updatedImages.splice(imageIndex, 1);
        setProductData({ ...productData, images: updatedImages });
      } else {
        toast.error("Failed to remove image");
      }
    } catch (error) {
      toast.error("Failed to remove image:", error);
    }
  };

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axios.get(
          `https://little-fashion-backend.onrender.com/api/v1/product/readById/${productId}`
        );
        if (response.status === 200) {
          setProductData(response.data);
        } else {
          throw new Error("Failed to fetch product");
        }
      } catch (error) {
        if (!handleEditModalClose) {
          setErrorFetching(true);
        }
        toast.error("Error fetching product:", error);
      }
    };

    fetchProductById();

    return () => {
      // Clean-up function if needed
    };
  }, [productId, handleEditModalClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading

    try {
      const response = await fetch(
        `https://little-fashion-backend.onrender.com/api/v1/product/editAndUpdate/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Error updating product:", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  return (
    <>
      <ToastContainer />
      {loading && ( // Step 2: Use loading state to toggle loader
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      {/* // Inside your component's return statement or JSX */}
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        {errorFetching && <p>Error fetching product. Please try again.</p>}
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={productData.name}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={productData.description}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={productData.price}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <div className="grid grid-cols-6">
            {productData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  className="h-20 m-2 col-span-1"
                  alt={`Product Image ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 -right-3 rounded-full p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    className="h-6"
                    viewBox="0 0 50 50"
                  >
                    <path d="M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <img className="h-10" src={fileUploadSVG} alt="" />
            </label>
            <button
              className="text-white px-4 py-2 bg-green-600 ml-2"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="badgeId"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Badge
          </label>
          <select
            id="badgeId"
            value={productData.badgeId}
            onChange={handleChange}
            name="badgeId"
            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Badge</option>
            {badges.map((badge) => (
              <option key={badge._id} value={badge._id}>
                {badge.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="categoryId"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Category
          </label>
          <select
            id="categoryId"
            value={productData.categoryId}
            onChange={handleChange}
            name="categoryId"
            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-5 py-2 text-white bg-blue-500 rounded-lg"
        >
          Update
        </button>
        <button
          onClick={handleEditModalClose}
          className="px-3 py-2 rounded-lg bg-red-500 text-white mx-2"
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default Product;
