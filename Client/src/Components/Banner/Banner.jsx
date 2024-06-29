import React, { useEffect, useState } from "react";
import Image1 from "../../assets/images/slideshow/medium-shot-business-women-high-five.jpeg";
import Image2 from "../../assets/images/slideshow/team-meeting-renewable-energy-project.jpeg";
import Image3 from "../../assets/images/slideshow/two-business-partners-working-together-office-computer.jpeg";
import { Link } from "react-router-dom";

function Banner() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const images = [
        {
            src: Image1,
            h1: " Cool Fashion",
            h5: "Little fashion template comes with total 8 HTML pages provided by Tooplate website.",
            pathtext: "learn more about us",
            path: "/story",
        },
        {
            src: Image2,
            h1: " New Design",
            h5: "Please share this Little Fashion template to your friends. Thank you for supporting us.",
            pathtext: "Explore products",
            path: "/product",
        },
        {
            src: Image3,
            h1: "Talk to us",
            h5: "Tooplate is one of the best HTML CSS template websites for everyone.",
            pathtext: "Work with us",
            path: "/contact",
        },
    ];

    const handleImageChange = (index) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex(index);
            setIsTransitioning(false);
        }, 50);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const newIndex = (currentImageIndex + 1) % images.length;
            handleImageChange(newIndex);
        }, 8000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [currentImageIndex]); // Run effect whenever currentImageIndex changes

    return (
        <>
            <div
                className="relative w-full h-[100vh] transition-opacity duration-300 overflow-hidden "
                style={{
                    backgroundImage: `linear-gradient(to top, #000000, transparent 90%), url(${images[currentImageIndex].src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    opacity: isTransitioning ? 0.4 : 1, // Adjust the opacity value for the fade effect
                }}
            >
                <div className="grid grid-cols-12 h-full  ">
                    <div className="col-span-6 xs:col-span-12 sm:col-span-12 ">
                        <div
                            className="  flex flex-col h-full justify-center pl-[5vw] gap-[7%] text-white "
                            data-aos="zoom-in-right"
                            data-aos-duration="1300"
                        >
                            <h1 className="text-[max(5vw,3.75rem)] leading-none font-[1000] font-sans ">
                                {images[currentImageIndex].h1}
                            </h1>
                            <h5 className="text-[max(1.4vw,1.2rem)]">
                                {images[currentImageIndex].h5}
                            </h5>
                            <div>
                                <Link
                                    to={images[currentImageIndex].path}
                                    className="uppercase bg-[#272727] py-[max(1vw,.8rem)] px-[max(1.4vw,1.5rem)] rounded-[max(1.8vw,1.5rem)] text-[max(1.2vw,1.1rem)] hover:bg-[--red] transition-all ease-in-out active:ring-4 ring-sky-500"
                                >
                                    {images[currentImageIndex].pathtext}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 xs:col-span-12 sm:col-span-12  bg-blac">
                        <div className="flex flex-col items-center h-full justify-center gap-5">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleImageChange(index)}
                                    className={`text-white `}
                                >
                                    <i
                                        className="fa-sharp fa-solid fa-circle text-[max(2vw,2rem)]  cursor-pointer hover:text-[--red] "
                                        data-aos="zoom-in-left"
                                        data-aos-duration="1300"
                                    ></i>
                                </div>
                            ))}
                        </div>{" "}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;
