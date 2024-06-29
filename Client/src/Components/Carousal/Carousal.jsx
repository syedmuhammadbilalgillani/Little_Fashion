import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function Carousal({ teamData }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });

    return (
        <>
            <div ref={sliderRef} className="keen-slider h-full">
                {teamData.map((member, index) => (
                    <div
                        className="keen-slider__slide   text-white p-20 sm:p-0 xs:p-0"
                        key={index}
                    >
                        <div className="px-[max(4vw,4rem)] sm:p-0 xs:p-0">
                            <div className="flex gap-[max(.2vw,.2rem)] text-[--red]">
                                <i className="fa-solid fa-apostrophe fa-flip-both text-[max(4vw,4rem)]"></i>
                                <i className="fa-solid fa-apostrophe fa-flip-both text-[max(4vw,4rem)]"></i>
                            </div>
                            <div className="px-[max(3.5vw,3.5rem)] space-y-[max(1.3vw,1.3rem)]">
                                <h1 className=" text-[max(1.2vw,1.2rem)] text-black  font-extralight font-sans dark:text-white">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Quas natus assumenda labore modi ipsam. Ad tempora
                                    deserunt labore repellat corporis quos pariatur cum non,
                                    facere, laudantium aliquid. Quaerat, suscipit illo.
                                </h1>
                                <div className="flex items-center gap-[max(1vw,1rem)] text-black dark:text-white py-[1rem] ">
                                    <img
                                        className="w-[max(5vw,3rem)] h-[max(5vw,3rem)] p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                                        src={member.img}
                                        alt="Bordered avatar"
                                    />
                                    <div className="flex items-center gap-[max(.5vw,.5rem)]">
                                        <div className="text-[max(1.4vw,1rem)]">
                                            {member.firstName}
                                        </div>
                                        <div className="text-[max(1.4vw,1rem)] font-bold text-[--p]">
                                            {member.designation}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            {loaded && instanceRef.current && (
                <div className="flex justify-center cursor-pointer mx-[30%]">
                    {[
                        ...Array(
                            instanceRef.current.track.details.slides.length
                        ).keys(),
                    ].map((idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx);
                                }}
                                className={
                                    "h-[.12vw]  w-full  bg-[--grey] btn " +
                                    (currentSlide === idx ? "active" : "")
                                }
                            ></button>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default Carousal;
