// import AddProduct from "./Pages/AddProduct";
// import Read from "./Pages/Read";
// import ReadById from './Pages/ReadById';
import CreateBankAccount from './Pages/CreateBankAccount';
import Badge from './Pages/Badge';
import Category from './Pages/Category';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,

} from "react-router-dom";
import App from './App'
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import Product from "./Pages/Products";
import ContactForms from "./Pages/ContactForms";
// import EditForm from "./Pages/EditForm";
// import ReadProducts from "./Pages/ReadProducts";
// import EditProductForm from "./Pages/EditProducts";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<Users />} />
            <Route path="/product" element={<Product />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/createBankAccountDetails" element={<CreateBankAccount />} />
            <Route path="/badge" element={<Badge />} />
            <Route path="/category" element={<Category />} />
            <Route path="/contactForm" element={<ContactForms />} />
            {/* <Route path="/editForm" element={<EditForm />} /> */}
            {/* <Route path="/readProduct" element={<ReadProducts />} /> */}
            {/* <Route path="/editProduct" element={<EditProductForm />} /> */}
            {/* <Route path="/products/:productId" element={<ReadById />} /> */}
        </Route>
    )
);




















// import React from 'react'
// import AddProduct from './Pages/AddProduct';
// import Read from './Pages/Read';
// import ReadById from './Pages/ReadById';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './Components/Sidebar/Sidebar';

// function Router() {
//     return (
//         <>
//             <Router>
//                 <Sidebar></Sidebar>
//                 <Routes>
//                     {/* Use 'element' prop to render components, not 'component' */}
//                     <Route path="/" element={<Read />} exact />
//                     <Route path="/products/:productId" element={<ReadById />} />
//                     <Route path="/AddProduct" element={<AddProduct />} />
//                 </Routes>
//             </Router>
//         </>
//     )
// }

// export default Router