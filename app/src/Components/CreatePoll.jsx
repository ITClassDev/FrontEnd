import React, { useState } from "react";
import "../poll.css";
import { PlusCircleOutlined, SelectOutlined, FileTextOutlined } from '@ant-design/icons';

import {
    Button,
    Form,
    Input,
    Upload,
    message,
    FloatButton,
    Typography,
    Card,
    Space,
} from "antd";
import { OneItemSelect, OneLineText, MultilineText, CheckboxSelect, EditableQuestionBase } from "../Components/Polls/PollsUI";

const { TextArea } = Input;
const { Text } = Typography;

const CreatePoll = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [questions, setQuestions] = useState([]);
    return (<>
        <FloatButton.Group
            trigger="click"
            type="primary"
            style={{
                right: 94,
            }}
            icon={<PlusCircleOutlined />}
        >
            <FloatButton icon={<SelectOutlined />} tooltip={"Выбор одного ответа"} />
            <FloatButton icon={<FileTextOutlined />} tooltip={"Многострочный ответ"} />
            <FloatButton icon={<FileTextOutlined />} tooltip={"Одна строка"} onClick={() => {
                setQuestions([...questions, { type: 1, text: "ShTP" }]);
            }} />

        </FloatButton.Group>
        {contextHolder}
        {/* <Form
            name="create_poll"
            autoComplete="on"
            requiredMark={false}
        >
            <Form.Item
                label="Заголовок"
                name="title"
                rules={[
                    {
                        required: true,
                        message: "Введите заголовок",
                    },
                ]}
            >
                <Input placeholder="Опрос #1223" />
            </Form.Item>
            <Form.Item
                label="Описание"
                name="description"
                rules={[
                    {
                        required: true,
                        message:
                            "Введите описание опроса",
                    },
                ]}
            >
                <TextArea
                    rows={4}
                    placeholder="Опрос для ..."
                />
            </Form.Item>
        </Form> */}
        <div className="wrapper_admin">
            <Form
                name="poll_questions"
                autoComplete="off"
                requiredMark={false}
                onFinish={(data) => { console.log(data); }}
            >
                <Card style={{ marginBottom: 20 }} title={<Form.Item name="poll_name" style={{ margin: 0 }}><Input placeholder="Название" /></Form.Item>}>
                    <Form.Item name="poll_description" style={{ margin: 0 }}>
                        <TextArea placeholder="Описание" />
                    </Form.Item>

                    
                </Card>
                <EditableQuestionBase/>
                <Button type="primary" htmlType="submit">Создать</Button>
            </Form>
        </div>
    </>);
}

export default CreatePoll;