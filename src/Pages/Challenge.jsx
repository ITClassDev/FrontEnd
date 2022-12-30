import React from "react";
import ProgTask from "../Components/ProgTask";
import { Typography } from "antd";

const { Title } = Typography;

const Challenge = () => {
  return (
    <>
      <Title level={3}>Задача дня</Title>
      <ProgTask
        title={"Своп соседей"}
        desc="Напишите программу, которая переставляет соседние элементы массива (1-й элемент поменять с 2-м, 3-й с 4-м и т.д. Если элементов нечетное число, то последний элемент остается на своем месте)."
        time_limit={20}
        memory_limit={512}
      />
    </>
  );
};

export default Challenge;
