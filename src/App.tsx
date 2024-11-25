import React, { useState } from "react";
import * as s from "./App.module.scss";

export const App = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => {
        setCount(count + 1);
    };
    return (
        <div>

            <h1 className={s.h1}>{count}</h1>
            <button className={"red"} onClick={increment}>inc</button> {/* Змінено на styles */}

        </div>
    );
};