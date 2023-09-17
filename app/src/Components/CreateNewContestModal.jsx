import React, { useEffect, useState } from "react";
import { Modal, Typography, Form, Input, Button, Select, DatePicker, InputNumber } from "antd";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import { API } from "../api";
import MultipleTaskSearch from "./MultipleTasksSearch";

const { Text } = Typography;

const CreateNewContestModal = ({ open, setModalOpened, userGroups, onCreate, defaults }) => {
  const [tasksSelected, setTasksSelected] = useState([]);
  const [deadlineInput, setDeadlineInput] = useState();
  const [userGroupsInput, setUserGroupsInput] = useState([]);
  const [userClassInput, setUserClassInput] = useState([]);
  const [form] = Form.useForm();

  const createContestHandler = (form_data) => {
    onCreate(form_data, userGroupsInput, userClassInput, tasksSelected, deadlineInput);
  }

  useEffect(() => {
    form.resetFields();
    let res = [];
    defaults["tasks"].map((task) => {
      API({ endpoint: `/assigments/tasks/${task.uuid}`, ok: (resp) => {
        res.push({ key: task.uuid, uuid: task.uuid, title: resp.data.title });
      }});
    });
    console.log(res);
    form.setFieldsValue({ contest_name: defaults["title"], contest_description: defaults["description"] });
    // console.log(form.getFieldsValue());

  }, [defaults])

  return (
    <>
      <Modal
        title='Контест'
        transitionName=""
        open={open}
        footer={<></>}
        onOk={() => {
          setModalOpened(false);
        }}
        onCancel={() => {
          setModalOpened(false);
        }}
      >
        <Form name="create_contest" className="create-contest-form" onFinish={createContestHandler} form={form} layout="vertical">
          <Form.Item
            name="contest_name"
            label={<Text strong>Название контеста</Text>}
            rules={[
              {
                required: true,
                message: "Введите название контеста",
              },
            ]}
          >
            <Input placeholder="Название" />
          </Form.Item>
          <Form.Item
            name="contest_description"
            label={<Text strong>Описание контеста</Text>}
            rules={[
              {
                required: true,
                message: "Введите описание контеста",
              },
            ]}
          >
            <Input placeholder="Короткое описание" />
          </Form.Item>
          <Form.Item
            name="tasks"
            // rules={[
            //   {
            //     message: "Выберите хотя бы одну задачу",
            //     validator: (_, value) => {
            //       return [Promise.resolve(), Promise.reject("Выберите хотя бы одну задачу")][tasksSelected.length > 1];
            //     }
            //   }
            // ]}
            label={<Text strong>Задачи в контесте</Text>}
          >
            <MultipleTaskSearch value={tasksSelected} setValue={setTasksSelected} />
          </Form.Item>

          <Form.Item
            name="user_groups"
            label={<Text strong>Группы пользователей</Text>}
          >
            <Select
              mode="tags"
              value={userGroupsInput}
              onChange={(e) => {
                setUserGroupsInput(e)
              }}
              options={userGroups.map((item, index) => ({
                key: index,
                value: item.uuid,
                label: item.name,
              }))}
              style={{
                width: "100%",
              }}
              tokenSeparators={[","]}
            />
          </Form.Item>

          <Form.Item
            name="learningClass"
            label={<Text strong>Класс обучения</Text>}
          >
            <Select
              options={[{
                value: 10,
                title: 10
              },
              {
                value: 11,
                title: 11
              }]}
              value={userClassInput}
              onChange={(e) => {
                setUserClassInput(e)
              }}

              style={{
                width: "100%",
              }}
            />
          </Form.Item>


          <Form.Item
            name="deadline"
            label={<Text strong>Дата окончания</Text>}
          >
            <DatePicker locale={locale} placeholder="Последний день для сдачи контеста" format="YYYY-DD-MM HH:mm:ss" showTime={true} onChange={(e) => {
              if (e) setDeadlineInput(e.$d.toISOString());
            }} />

          </Form.Item>
          <Text strong>Система оценивания</Text>
          <Form.Item
            name="mark5"
            label={<Text strong>Минимум для `5`</Text>}
            rules={[
              {
                required: true,
                message: "Введите границу оценки 5",
              },
            ]}
          >
            <InputNumber min={1} max={10000} placeholder="10 задач" />
          </Form.Item>
          <Form.Item
            name="mark4"
            label={<Text strong>Минимум для `4`</Text>}
            rules={[
              {
                required: true,
                message: "Введите границу оценки 4",
              },
            ]}
          >
            <InputNumber min={1} max={10000} placeholder="7 задач" />

          </Form.Item>
          <Form.Item
            name="mark3"
            label={<Text strong>Минимум для `3`</Text>}
            rules={[
              {
                required: true,
                message: "Введите границу оценки 3",
              },
            ]}
          >
            <InputNumber min={1} max={10000} placeholder="5 задач" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateNewContestModal;