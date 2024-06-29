import React, { useState } from "react";
import useTheme from "../../context/theme";

export default function ThemeBtn() {
    const { themeMode, lightTheme, darkTheme } = useTheme();
    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked;
        if (darkModeStatus) {
            darkTheme();
        } else {
            lightTheme();
        }
    };

    const [isChecked, setIsChecked] = useState(true); // Default value is true

    const handleChange = () => {
        setIsChecked(!isChecked); // Toggle the checked state
    };
    return (
        <label htmlFor="theme" className=" cursor-pointer transition-all ease-in-out duration-200">
            <input
                type="checkbox"
                id="theme"
                className="sr-only peer"
                onChange={onChangeBtn}
                checked={themeMode === "dark"}
            />
            <div onClick={handleChange}>
                {" "}
                <i
                    className={
                        isChecked
                            ? " fa-solid fa-moon-stars ext-[max(1.2vw,25px)] "
                            : "fa-solid fa-sun-bright ext-[max(1.2vw,25px)]"
                    }
                ></i>
            </div>
        </label>
    );
}
