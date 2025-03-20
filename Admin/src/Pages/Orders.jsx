import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-2" onClick={toggleAccordion}>
        {title}
        <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
      </h2>
      {isOpen && content}
    </section>
  );
};

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://littlefasionserver.vercel.app/api/v1/user/users-with-orders"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching orders");
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `https://littlefasionserver.vercel.app/api/v1/user/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) throw new Error("Failed to update status");
      const updatedOrder = await response.json();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
      toast.success(updatedOrder.message);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.userData.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by username..."
        className="border border-gray-300 rounded px-4 py-2 mb-4"
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Product Status
              </th>

              <th scope="col" className="px-6 py-3">
                Order History
              </th>
              <th scope="col" className="px-6 py-3">
                Product History
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Details
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order.userData && (
                    <div className="flex flex-col">
                      <p className="mb-2">
                        <span className="font-bold">Username:</span>{" "}
                        {order.userData.username}
                      </p>
                      <p>
                        <span className="font-bold">Phone Number:</span>{" "}
                        {order.userData.phoneNumber}
                      </p>
                    </div>
                  )}
                </th>
                <td className="px-6 py-4">
                  <p>{order.status}</p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const newStatus = e.target.elements.status.value;
                      handleStatusUpdate(order._id, newStatus);
                    }}
                  >
                    <div className="flex items-center mt-4">
                      <label htmlFor="status" className="font-bold mr-2">
                        Update Status:
                      </label>
                      <select
                        id="status"
                        name="status"
                        className="border border-gray-300 rounded px-4 py-2 mr-2"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Payment_succeed">Payment Succeed</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </td>

                <td className="px-6 py-4">
                  <ul className="space-y-2">
                    <li>
                      <span className="font-bold">Name:</span> {order.name}
                    </li>
                    <li>
                      <span className="font-bold">Email:</span> {order.email}
                    </li>
                    <li>
                      <span className="font-bold">Phone:</span> {order.phone}
                    </li>
                    <li>
                      <span className="font-bold">Address:</span>{" "}
                      {order.address}
                    </li>
                    <li>
                      <span className="font-bold">Total Price:</span> $
                      {order.totalPrice}
                    </li>
                    <li>
                      <span className="font-bold">Total Quantity:</span>{" "}
                      {order.totalQuantity}
                    </li>
                    {/* <li><span className="font-bold">Total Quantity:</span> {order.payment}</li> */}
                    <li>
                      <span className="font-bold">Created At:</span>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </li>
                  </ul>
                </td>

                <td className="px-6 py-4">
                  <ul className="space-y-4">
                    {order.products.map((product, index) => (
                      <li key={index}>
                        <p className="font-bold">
                          Product Name: {product.productName}
                        </p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: ${product.price}</p>
                        <p>Total Price: ${product.totalPrice}</p>
                      </li>
                    ))}
                  </ul>
                </td>

                <td className="px-6 py-4">
                  <ul className="space-y-4">
                    <li>
                      {order.payment.transactionType === "Online" ? (
                        <>
                          <p>
                            <span className="font-bold">Transaction Type:</span>{" "}
                            {order.payment.transactionType}
                          </p>
                          <p>
                            <span className="font-bold">Transaction ID:</span>{" "}
                            {order.payment.transactionId}
                          </p>
                          <p>
                            <span className="font-bold">
                              Bank Account Name:
                            </span>{" "}
                            {order.payment.bankAccountName}
                          </p>
                          <p>
                            <span className="font-bold">
                              Bank Account Name:
                            </span>{" "}
                            <img
                              src={order.payment.transactionImage}
                              className="h-40 w-40"
                              alt=""
                            />
                          </p>
                        </>
                      ) : (
                        <p>
                          <span className="font-bold">Transaction Type:</span>{" "}
                          {order.payment}
                        </p>
                      )}
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrdersList;

// import React, { useState } from 'react';

// function TableRow({ name, age, accordionContent1, accordionContent2, accordionContent3 }) {
//     const [accordionOpen1, setAccordionOpen1] = useState(false);
//     const [accordionOpen2, setAccordionOpen2] = useState(false);
//     const [accordionOpen3, setAccordionOpen3] = useState(false);

//     const toggleAccordion1 = () => {
//         setAccordionOpen1(!accordionOpen1);
//     };

//     const toggleAccordion2 = () => {
//         setAccordionOpen2(!accordionOpen2);
//     };

//     const toggleAccordion3 = () => {
//         setAccordionOpen3(!accordionOpen3);
//     };

//     return (
//         <>
//             <tr>
//                 <td>{name}</td>
//                 <td>{age}</td>
//                 <td>
//                     <button onClick={toggleAccordion1}>Toggle Accordion 1</button>
//                 </td>
//                 <td>
//                     <button onClick={toggleAccordion2}>Toggle Accordion 2</button>
//                 </td>
//                 <td>
//                     <button onClick={toggleAccordion3}>Toggle Accordion 3</button>
//                 </td>
//             </tr>
//             {accordionOpen1 && (
//                 <tr>
//                     <td colSpan="5">
//                         <div className="accordion">
//                             {/* Accordion content goes here */}
//                             {accordionContent1}
//                         </div>
//                     </td>
//                 </tr>
//             )}
//             {accordionOpen2 && (
//                 <tr>
//                     <td colSpan="5">
//                         <div className="accordion">
//                             {/* Accordion content goes here */}
//                             {accordionContent2}
//                         </div>
//                     </td>
//                 </tr>
//             )}
//             {accordionOpen3 && (
//                 <tr>
//                     <td colSpan="5">
//                         <div className="accordion">
//                             {/* Accordion content goes here */}
//                             {accordionContent3}
//                         </div>
//                     </td>
//                 </tr>
//             )}
//         </>
//     );
// }

// function Table() {
//     const data = [
//         { name: 'John', age: 30, accordionContent1: 'Accordion Content 1 for John', accordionContent2: 'Accordion Content 2 for John', accordionContent3: 'Accordion Content 3 for John' },
//         { name: 'Jane', age: 25, accordionContent1: 'Accordion Content 1 for Jane', accordionContent2: 'Accordion Content 2 for Jane', accordionContent3: 'Accordion Content 3 for Jane' },
//         { name: 'Doe', age: 40, accordionContent1: 'Accordion Content 1 for Doe', accordionContent2: 'Accordion Content 2 for Doe', accordionContent3: 'Accordion Content 3 for Doe' },
//     ];

//     return (
//         <table>
//             <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Age</th>
//                     <th>Action 1</th>
//                     <th>Action 2</th>
//                     <th>Action 3</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {data.map((item, index) => (
//                     <TableRow
//                         key={index}
//                         name={item.name}
//                         age={item.age}
//                         accordionContent1={item.accordionContent1}
//                         accordionContent2={item.accordionContent2}
//                         accordionContent3={item.accordionContent3}
//                     />
//                 ))}
//             </tbody>
//         </table>
//     );
// }

// export default Table;
