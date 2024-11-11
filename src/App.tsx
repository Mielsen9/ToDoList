import React, { useState } from "react";
import * as s from "./App.module.scss";
import About from "@/components/pages/about/About";
import avatarPng from "@/asset/ss.png";
import avatarJpg from "@/asset/tobi.jpg";
import Telegram from "@/asset/telegram.svg";

// function TODO() {
//     TODO2()
// }
// function TODO2() {
//     throw new Error();
// }

export const App = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => {
        setCount(count + 1);
    };
    return (
        <div>
            <div className={s['flex-b']}>
                <img src={avatarPng} alt=""/>
                <img src={avatarJpg} alt=""/>
            </div>

            <div>
                <Telegram/>
            </div>

            <h1 className={s.h1}>{count}</h1>
            <button className={"red"} onClick={increment}>inc</button>
            {/* Змінено на styles */}
            <About/>

        </div>
    );
};