import React from "react";
import { API } from "../api";

import "react-quill/dist/quill.snow.css";
import TaskForm from "./TaskForm";


const CreateTaskCard = ({ messageApi, callback }) => {
  const createTaskFormHandler = (form_data) => {
    console.log(form_data.types);
    API({
      endpoint: "/assigments/tasks/", method: "put", message: { show: 1, api: messageApi, ok: "Задача успешно добавлена!", err: "Задача НЕ добавлена! Проверьте данные!" }, data: {
        title: form_data.title,
        text: form_data.text,
        timeLimit: form_data.timeLimit,
        memoryLimit: form_data.memoryLimit,
        dayChallenge: form_data.dayChallenge,
        tests: form_data.tests,
        testsTypes: form_data.types
      }, ok: () => {
        callback();
      }
    });
  };

  return (
    <>
      <TaskForm createTaskFormHandler={createTaskFormHandler} />
    </>
  );
};

export default CreateTaskCard;
