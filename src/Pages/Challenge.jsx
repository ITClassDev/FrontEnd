import React from "react";
import ProgTask from "../Components/ProgTask";

const Challenge = () => {
    return (
        <>
            <h1>Задача дня</h1>
            <ProgTask title={"Своп соседей"} desc="Напишите программу, которая переставляет соседние элементы массива (1-й элемент поменять с 2-м, 3-й с 4-м и т.д. Если элементов нечетное число, то последний элемент остается на своем месте)." time_limit={20} memory_limit={512} />
        </>
    );
    
}


export default Challenge;