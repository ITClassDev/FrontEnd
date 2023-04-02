import React from "react";

import {
    Card,
    Select,
    Form,
    Input,
    Space,
    Checkbox,
    Typography,
    Image
} from "antd";

const { Text } = Typography;
const { TextArea } = Input;

export const QuestionBase = ({ ind, question, body }) => {
    return (
        <Card title={question.text} style={{ marginTop: 20 }} key={ind}>
            <Space direction="vertical" style={{ width: "100%" }}>
                {"image" in question && <Image src={question.image} className="poll_image" />}
                {"description" in question && <Text>{question.description}</Text>}
                <Form.Item name={`qustion_${ind}`}>{body}</Form.Item>
            </Space>
        </Card>
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