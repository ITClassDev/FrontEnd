import React from "react";
import ProgTask from "../Components/ProgTask";
import { Typography, Card } from "antd";
import { useEffect } from "react";
import { API } from "../api";
import { useState } from "react";
import LoadingBar from "../Components/Loading";
import useDocumentTitle from "../useDocumentTitle";
import { DayChallengeNotFound } from "./NotFound";

const { Title } = Typography;

export const Challenge = () => {
  useDocumentTitle("ШТП | Задача дня");
  const [dayChallenge, SetDayChallenge] = useState(
    <LoadingBar size="24" text={"Loading..."} />
  );
  
  useEffect(() => {
    API({
      endpoint: "/assigments/tasks/challenge", ok: (response) => {
        SetDayChallenge(
          <>
            <ProgTask
              title={response.data.title}
              desc={response.data.text}
              time_limit={response.data.timeLimit}
              memory_limit={response.data.memoryLimit}
              task_id={response.data.uuid}
              tests={response.data.tests}
            />
          </>
        );
      }, err: (response) => {
        if (response.status === 404){
          SetDayChallenge(<DayChallengeNotFound/>)
        }
      }
    })
  }, []);
  return (
    <>
      <Title level={3}>Задача дня</Title>
      {dayChallenge}
    </>
  );
};
