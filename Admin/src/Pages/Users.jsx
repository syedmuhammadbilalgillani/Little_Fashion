import React, { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://littlefasionserver.vercel.app/api/v1/user/readAllUsers`
        ); // Assuming your API endpoint is at /api/users
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className=" mx-auto">
      <h1 className="text-3xl font-bold my-8">Admin Dashboard</h1>
      <table className="min-w-full divide-y divide-gray-200 *:relative overflow-x-auto shadow-md sm:rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Profile Picture
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.username || "No Record"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.email || "No Record"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={user.profilePicture || "No Record"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.address || "No Record"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.name || "No Record"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.phoneNumber || "No Record"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

// READ AND DELETE USER FORM

// import React, { useState, useEffect } from 'react';

// const AdminDashboard = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         // Fetch user data from the API
//         const fetchUsers = async () => {
//             try {
//                 const response = await fetch('https://littlefasionserver.vercel.app/api/v1/user/readAllUsers');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch user data');
//                 }
//                 const data = await response.json();
//                 setUsers(data);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUsers();
//     }, []);

//     const deleteUser = async (userId) => {
//         try {
//             const response = await fetch(`https://littlefasionserver.vercel.app/api/v1/user/delete/${userId}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to delete user');
//             }
//             // Update the users state after deleting the user
//             setUsers(users.filter(user => user._id !== userId));
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     return (
//         <div className="container mx-auto">
//             <h1 className="text-3xl font-bold my-8">Admin Dashboard</h1>
//             <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                     <tr>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Username
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Email
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Profile Picture
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Address
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Name
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Phone Number
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Actions
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                     {users.map(user => (
//                         <tr key={user._id}>
//                             <td className="px-6 py-4 whitespace-nowrap">{user.username || "No Record"}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{user.email || "No Record"}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 <img src={user.profilePicture || "No Record"} alt="Profile" className="w-20 h-20 rounded-full" />
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">{user.address || "No Record"}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{user.name || "No Record"}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{user.phoneNumber || "No Record"}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteUser(user._id)}>
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboard;
