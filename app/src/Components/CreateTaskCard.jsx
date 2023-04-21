import React, { useState } from "react";
import {
  Input,
  Typography
} from "antd";
import { createTask } from "../api";

import "react-quill/dist/quill.snow.css";
import TaskForm from "./TaskForm";


const CreateTaskCard = ({ messageApi }) => {
  const createTaskFormHandler = (form_data) => {
    console.log(form_data);
    createTask(
      form_data,
      (response) => {
        messageApi.open({
          type: "success",
          content: "Задача успешно добавлена!",
        });
      },
      (response) => {
        messageApi.open({
          type: "error",
          content: "Задача не добавлена! Проверьте данные!",
        });
      }
    );
  };

  return (
    <>
      <TaskForm createTaskFormHandler={createTaskFormHandler} />
    </>
  );
};

export default CreateTaskCard;
