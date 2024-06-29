import React, { useState } from 'react'
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,

} from "@material-tailwind/react";
function Modal() {
    const [open, setOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const handleOpen = (member) => {
        setSelectedMember(member);
        setOpen(!open);
    };

    return (
        <>
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
        </>
    )
}

export default Modal