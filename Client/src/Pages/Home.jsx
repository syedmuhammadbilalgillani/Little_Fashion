import React from "react";

const Banner = React.lazy(() => import("../Components/Banner/Banner.jsx"));
const About = React.lazy(() => import("../Components/AboutTab/About.jsx"));
const ProductHero = React.lazy(() => import("../Components/ProductHero/ProductTab.jsx"));
const ProductCards = React.lazy(() => import("../Components/ProductCards/ProductCards.jsx"));
import imgp from '../Components/ProductHero/ProductTab.jpg'
import { NavLink } from "react-router-dom";


function Home() {
   const heroobj = {
  img: imgp, // main banner/hero image
  headingRed: "Your One-Stop",
  headingText: " Online Store",
  paragraphText:
    "Discover the latest collections in fashion, electronics, and lifestyle essentials. Shop top brands at the best prices with fast delivery and secure checkout.",
  linkText: "Shop Now",
  linkTo: "/products"
};
    return (
        <>
            <main className="">
                <Banner />
                <About />
                <ProductHero img={heroobj.img} headingText={heroobj.headingText} headingRed={heroobj.headingRed} paragraphText={heroobj.paragraphText} linkText={heroobj.linkText} linkTo={heroobj.linkTo} />
                <ProductCards limit={3} showSearch={false} showPagination={false} />

            </main>
        </>
    );
}

export default Home;
