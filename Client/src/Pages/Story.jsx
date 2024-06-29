"use client";
import { Dialog, DialogBody } from "@material-tailwind/react";
import React, { useState } from "react";
import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";
import ProductTab from "../Components/ProductHero/ProductTab.jsx";
import imgS from "../assets/images/header/businesspeople-meeting-office-working.jpg";
import timg4 from "../assets/images/people/beautiful-woman-face-portrait-brown-background.jpeg";
import timg2 from "../assets/images/people/portrait-british-woman.jpeg";
import timg1 from "../assets/images/people/senior-man-wearing-white-face-mask-covid-19-campaign-with-design-space.jpeg";
import Carousal from "../Components/Carousal/Carousal.jsx";

// import "../Components/Buttons";
function Story() {
    const storyObj = {
        img: imgS,
        headingRed: "Company",
        headingText: " Fashion",
    };


    const teamData = [
        {
            img: timg1,
            firstName: "Don",
            designation: "Product , VP",
            fullName: "Don Haruko",
            fullDesignation: "Product , VP",
        },
        {
            img: timg2,
            firstName: "Kelly",
            designation: "Marketing",
            fullName: "Kelly Lisa",
            fullDesignation: "Global, Head of Marketing",
        },
        {
            img: timg4,
            firstName: "Marie",
            designation: "Founder",
            fullName: "Marie Sam",
            fullDesignation: "Founder & CEO",
        },
    ];

    const [open, setOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const handleOpen = (member) => {
        setSelectedMember(member);
        setOpen(!open);
    };


    return (
        <>
            <main className="">
                <ProductTab
                    img={storyObj.img}
                    headingRed={storyObj.headingRed}
                    headingText={storyObj.headingText}
                    order={true}
                ></ProductTab>

                <section
                    className="bg-[--grey] p-[max(7vw,7rem)] xs:p-[max(2vw,2rem)] sm:p-[max(2vw,2rem)]
                overflow-hidden "
                >
                    <h1 className="font-b xs:overflow-hidden">
                        Meet our <span className="text-[--red] font-b">team</span>
                    </h1>
                    <div className="gap-[1%] grid grid-cols-12 pt-[5vw]">
                        {teamData.map((member, index) => (
                            <div
                                key={index}
                                className="col-span-4 xs:col-span-12 sm:col-span-12 md:col-span-6
                                            p-[max(2.6vw,2.6rem)] rounded-[max(.4vw,.4rem)] flex *:flex-wrap items-center justify-between overflow-hidden bg-white"
                                onClick={() => handleOpen(member)}
                            >
                                <div className="flex  gap-[max(2vw,2rem)] items-center">
                                    <img
                                        src={member.img}
                                        className="h-[max(5vw,5rem)] rounded-full"
                                        alt=""
                                    />
                                    <div>
                                        <div className="text-[max(1.5vw,1.5rem)] font-bold">
                                            {member.firstName}
                                        </div>
                                        <div className="text-[max(1vw,1rem)] font-semibold">
                                            {member.designation}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className="bg-[--grey] rounded-[max(.375vw,.375rem)] p-[max(.5vw,.5rem)]"
                                        onClick={handleOpen}
                                    >
                                        <i className="fa-regular fa-plus rounded-full text-[max(1vw,1rem)] bg-white p-[max(.25vw,.25rem)] text-[--p] hover:bg-black"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <Dialog
                    open={open}
                    handler={handleOpen}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                    style={{ outline: "none" }}
                    className="w-1/2 sm:w-11/12 xs:w-11/12 shadow-lg rounded-lg"
                >
                    <DialogBody className="">
                        {selectedMember ? (
                            <div className="flex justify-between gap-2 w-full p-[5%]">
                                <img
                                    className="w-[max(5vw,5rem)] h-[max(5vw,5rem)] p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                                    src={selectedMember.img}
                                    alt="Bordered avatar"
                                />
                                <div>
                                    <div className="text-[max(1.8vw,1.8rem)] font-bold">
                                        {selectedMember.fullName}
                                    </div>
                                    <div className="text-[max(1.1vw,1.1rem)] font-semibold">
                                        {selectedMember.fullDesignation}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        <hr />
                        <div className="p-[5%]">
                            <h1>
                                Over three years in business had the chance to work on a variety
                                of projects with companies
                            </h1>
                            <br />
                            <div className="grid grid-cols-2 gap-1">
                                <div className="col-span-1">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Velit, officiis?
                                </div>
                                <div className="col-span-1">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                    Facilis, at!
                                </div>
                            </div>
                        </div>
                    </DialogBody>
                </Dialog>

                <section className="p-[7vw]">
                    <h1 className="font-b xs:overflow-hidden dark:text-white text-center ">
                        Customer love, <br />
                        <span className="text-[--red] font-b">Little</span> Fashion
                    </h1>


                    <Carousal teamData={teamData}></Carousal>

                </section>
            </main>
        </>
    );
}

export default Story;
