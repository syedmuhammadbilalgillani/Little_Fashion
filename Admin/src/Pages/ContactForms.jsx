// src/FormList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormList() {
    const [formDataList, setFormDataList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/port/api/v1/contactForm/getsubmitForm');
                setFormDataList(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h2 className='text-center text-3xl font-semibold py-6' >Form Data List</h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name:
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email:
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Subject
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Messages
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {formDataList.map((formData, index) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {formData.name}
                                </th>
                                <td className="px-6 py-4">
                                    {formData.email}
                                </td>

                                <td className="px-6 py-4">
                                    {formData.subject}
                                </td>
                                <td className="px-6 py-4">
                                    {formData.message}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default FormList;
