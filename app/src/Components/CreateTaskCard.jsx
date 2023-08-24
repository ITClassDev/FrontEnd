import React from "react";
import { API } from "../api";
import Form from "antd/es/form/Form";

import "react-quill/dist/quill.snow.css";
import TaskForm from "./TaskForm";
import { sendTask } from "../api";


const CreateTaskCard = ({ messageApi, callback }) => {
  const [form] = Form.useForm();
  const createTaskFormHandler = (form_data) => sendTask("/assigments/tasks", "put", form_data, messageApi, callback, "Задача успешно добавлена!", "Задча НЕ добавлена! Проверьте данные!");

  return (
      <TaskForm form={form} createTaskFormHandler={createTaskFormHandler} />
  );
};

export default CreateTaskCard;
