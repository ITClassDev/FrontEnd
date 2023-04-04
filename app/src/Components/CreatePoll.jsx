import React, { useState } from "react";
import "../poll.css";

import {
    Button,
    Form,
    Input,
    message,
    Card,
} from "antd";
import { EditableQuestionBase } from "../Components/Polls/PollsUI";
import { API } from "../api";
const { TextArea } = Input;


const CreatePoll = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const ProcessForm = (data) => {
        console.log(data);
        if (!data.title) {
            messageApi.open({ type: 'error', content: "Введите название опроса" });
            return;
        }
        if (!data.entries) {
            messageApi.open({ type: 'error', content: "Добавьте хотя бы один вопрос" });
            return;
        }
        // If validation ok
        API({ endpoint: "/polls", method: "put", data: data, message: { show: true, api: messageApi, ok: "Опрос успешно создан!", err: "Опрос не создан!" } });

    }
    return (<>
        {contextHolder}
        <div className="wrapper_admin">
            <Form
                name="poll_questions"
                autoComplete="off"
                requiredMark={false}
                onFinish={ProcessForm}
            >
                <Card style={{ marginBottom: 20 }} title={<Form.Item name="title" style={{ margin: 0 }}><Input placeholder="Название опроса" /></Form.Item>}>
                    <Form.Item name="description" style={{ margin: 0 }}>
                        <TextArea placeholder="Описание опроса" />
                    </Form.Item>
                </Card>
                <EditableQuestionBase />
                <Button type="primary" htmlType="submit">Создать</Button>
            </Form>
        </div>
    </>);
}

export default CreatePoll;