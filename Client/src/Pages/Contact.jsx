import React from "react";
import ProductTab from "../Components/ProductHero/ProductTab";
import contactImg from "../assets/images/header/positive-european-woman-has-break-after-work.jpg";
import ContactForm from "../Components/ContactForm/ContactForm";
import ConTable from "../Components/ConTable/ConTable";

function Contact() {
    const storyObj = {
        img: contactImg,
        headingRed: "Say hello to us",
        headingText: "love to hear you",
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

                <section className=" px-[6%] overflow-hidden p-[max(5vw,5rem)]">
                    <h1 className=" font-b dark:text-white">Let's <span className="font-b text-[--red]">begin</span></h1>
                    <div className="grid grid-cols-2 g-1 w-full my-[max(3vw,3rem)] ">
                        <div className="col-span-1 md:col-span-2 sm:col-span-2 xs:col-span-2"> <ContactForm></ContactForm></div>
                        <div className="col-span-1 md:col-span-2 sm:col-span-2 xs:col-span-2">
                            <ConTable></ConTable>
                        </div>
                    </div>



                </section>
            </main>
        </>
    );
}

export default Contact;
