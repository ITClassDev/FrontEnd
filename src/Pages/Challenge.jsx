import React from "react";
import ProgTask from "../Components/ProgTask";
import { Typography } from "antd";
import { useEffect } from "react";
import { getDayChallenge } from "../api";
import { useState } from "react";
import LoadingBar from "../Components/Loading";

const { Title } = Typography;

const Challenge = () => {
  const [dayChallenge, SetDayChallenge] = useState(
    <LoadingBar size="24" text={"Loading..."} />
  );
  useEffect(() => {
    getDayChallenge(
      (response) => {
        SetDayChallenge(
          <ProgTask
            title={response.data.title}
            desc={response.data.text}
            time_limit={response.data.time_limit}
            memory_limit={response.data.memory_limit}
            task_id={response.data.id}
          />
        );
      },
      (response) => {}
    );
  }, []);
  return (
    <>
      <Title level={3}>Задача дня</Title>
      {dayChallenge}
    </>
  );
};

export default Challenge;
