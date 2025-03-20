import React, { useState } from "react";
import axios from "axios";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://littlefasionserver.vercel.app/api/v1/contactForm/submitForm",
        formData
      );
      console.log(response.data);
      // Add code to handle successful form submission (e.g., show success message)
      // For example, you could reset the form fields after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      console.log(formData);
    } catch (error) {
      console.error(error);
      // Add code to handle error (e.g., show error message)
    }
  };

  return (
    <>
      <form className="space-y-[max(1vw,1rem)]" onSubmit={handleSubmit}>
        <div className="relative z-0">
          <input
            autoComplete="name"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Name
          </label>
        </div>

        <div className="relative z-0">
          <input
            autoComplete="email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Email
          </label>
        </div>
        <div className="relative z-0">
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="subject"
            className="absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Subject
          </label>
        </div>
        <div className="relative z-0">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="message"
            className="absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Message
          </label>
        </div>

        <button
          type="submit"
          className="bg-black hover:bg-[--red] px-[max(5vw,5rem)] text-white py-[max(1vw,1rem)] rounded-[2vw] text-[max(1vw,1rem)]"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default ContactForm;

// sample

// import React from 'react';

// class InputComponent extends React.Component {
//     render() {
//         const { type, label, value, onChange } = this.props;

//         return (
//             <div>
//                 <label>{label}</label>
//                 <input type={type} value={value} onChange={onChange} />
//             </div>
//         );
//     }
// }

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             inputValue: ''
//         };
//     }

//     handleInputChange = (e) => {
//         this.setState({ inputValue: e.target.value });
//     }

//     render() {
//         return (
//             <div>
//                 <InputComponent
//                     type="text"
//                     label="Name:"
//                     value={this.state.inputValue}
//                     onChange={this.handleInputChange}
//                 />

//                 <InputComponent
//                     type="number"
//                     label="Age:"
//                     value={this.state.inputValue}
//                     onChange={this.handleInputChange}
//                 />
//             </div>
//         );
//     }
// }

// export default App;
