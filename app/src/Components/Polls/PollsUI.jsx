import React, { useState } from "react";

import {
    Card,
    Select,
    Form,
    Input,
    Space,
    Checkbox,
    Typography,
    Image,
    Button
} from "antd";
import { PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { TextArea } = Input;

export const QuestionBase = ({ ind, question, body }) => {
    return (
        <Card title={question.text} style={{ marginTop: 20 }} key={ind}>
            <Space direction="vertical" style={{ width: "100%" }}>
                {"image" in question && <Image src={question.image} className="poll_image" />}
                {"description" in question && <Text>{question.description}</Text>}
                <Form.Item name={ind}>{body}</Form.Item>
            </Space>
        </Card>
    );
};

export const Entry = ({ name, restField }) => {
    const [localQuestionType, setLocalQuestionType] = useState(0);
    return (
        <Card
            title={<Form.Item {...restField} name={[name, "text"]} style={{ margin: 0 }}><Input placeholder="Напишите здесь вопрос" /></Form.Item>}
            style={{
                marginBottom: 8
            }}
        >
            <Form.Item {...restField} name={[name, "description"]} style={{ margin: 0 }}><TextArea placeholder="Дополнительный текст к вопросу (необязательно)" style={{
                marginBottom: 10
            }} /></Form.Item>
            <Form.Item {...restField} name={[name, "type"]} style={{ margin: 0 }}><Select value={localQuestionType} onChange={(q) => { setLocalQuestionType(q) }} placeholder={"Тип вопроса"} options={[
                { value: 0, label: "Выбор одного" },
                { value: 1, label: "Одна строка" },
                { value: 2, label: "Много строк" },
                { value: 3, label: "Выбор нескольких" }
            ]} style={{
                width: '100%',
                marginBottom: 10
            }} /></Form.Item>
            {{
                0: <></>,
                1: <Input placeholder="Введите ответ..." disabled={true} />,
                2: <TextArea placeholder="Введите ответ..." disabled={true} />,
                3: "123"
            }[localQuestionType]}

        </Card>

    );
}

export const EditableQuestionBase = () => {
    return (
        <Form.List name="entries">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Entry key={key} name={name} restField={restField} />
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Добавить вопрос
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
};


export const OneItemSelect = ({ ind, question }) => {
    return (
        <QuestionBase
            body={
                <Select style={{ width: "100%" }} options={question.variants}></Select>
            }
            ind={ind}
            question={question}
        />
    );
};

export const OneLineText = ({ ind, question }) => {
    return (
        <QuestionBase
            body={
                <Input
                    style={{ width: "100%" }}
                    placeholder="Введите свой ответ"
                ></Input>
            }
            ind={ind}
            question={question}
        />
    );
};

export const MultilineText = ({ ind, question }) => {
    return (
        <QuestionBase
            body={
                <TextArea
                    style={{ width: "100%" }}
                    placeholder="Введите свой ответ"
                ></TextArea>
            }
            ind={ind}
            question={question}
        />
    );
};

export const CheckboxSelect = ({ ind, question }) => {
    return (
        <QuestionBase
            body={<Checkbox.Group>
                <Space direction="vertical">
                    {question.variants.map((el, index) => (
                        <Checkbox value={el.value} key={index}><Text style={{ marginLeft: 5 }}>{el.label}</Text></Checkbox>
                    ))}
                </Space>
            </Checkbox.Group>
            }
            ind={ind}
            question={question}
        />
    );
};