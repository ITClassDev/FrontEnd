import React, { useEffect, useState } from "react";
import {
    Button,
    Form,
    Input,
    Typography,
    InputNumber,
    Space,
    Checkbox,
} from "antd";
import {
    FieldStringOutlined,
    MinusCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TagsArray } from "./TagsArray";

const { TextArea } = Input;
const { Text } = Typography;



const TaskForm = ({ form, createTaskFormHandler, name = "add_task", types = null }) => {
    const [convertedText, setConvertedText] = useState();
    const [inputTypes, setInputTypes] = useState([]);
    const [outputTypes, setOutputTypes] = useState([]);
    const AVAILABLE_DATA_TYPES = [/^(int)+$/, /^(long long)+$/, /^(double)+$/, /^(char[^]*)+$/,
                                 /^(string)+$/, /^(float)+$/, /^(vector<[^]*>)+$/, /^(map<[^]*>)+$/];

    const isTypeAvailable = (text, types = AVAILABLE_DATA_TYPES) => {
        return types.some(rx => rx.test(text[text.length - 1]));
    }
    useEffect(() => {
        if (types) {
            setInputTypes(types.input);
            setOutputTypes(types.output);
        }
    }, [types])

    return (
        <Form
            form={form}
            name={name}
            className="create-task-form"
            layout="vertical"
            requiredMark={false}
            onFinish={(e) => {
                console.log(e);
                createTaskFormHandler({ ...e, types: { input: inputTypes, output: outputTypes } });
            }}
            onSubmitCapture={() => { }}
        >
            <Form.Item
                name="title"
                label="Название задачи"
                rules={[
                    {
                        required: true,
                        message: "Введите заголовок",
                    },
                ]}
            >
                <Input
                    prefix={<FieldStringOutlined className="site-form-item-icon" />}
                    placeholder="Название задачи (тайтл)"
                />
            </Form.Item>
            <Form.Item
                name="text"
                label="Текст задачи"
                rules={[
                    {
                        required: true,
                        message: "Введите текст задачи",
                    },
                ]}
            >
                <ReactQuill
                    theme="snow"
                    value={convertedText}
                    onChange={setConvertedText}
                    placeholder="Полный текст задачи"
                />
            </Form.Item>
            <Form.Item
                name="timeLimit"
                label="Максимальное время работы решения (секунды)"
                rules={[
                    {
                        required: true,
                        message: "Укажите лимит на время работы решения",
                    },
                ]}
            >
                <InputNumber min={1} max={50} placeholder="1 с" />
            </Form.Item>
            <Form.Item
                name="memoryLimit"
                label="Максимальный объём используемой памяти решением (КБ)"
                rules={[
                    {
                        required: true,
                        message: "Укажите лимит на использованную память программой",
                    },
                ]}

            >
                <InputNumber min={32} max={4096} placeholder="32 KB" />
            </Form.Item>

            <Form.Item
                name="functionName"
                label="Название функции (для ДЗ)"
            >
                <Input placeholder="itcMyFunc" />
            </Form.Item>


            <Form.Item name="dayChallenge" valuePropName="checked">
                <Checkbox>Сделать задачей дня</Checkbox>
            </Form.Item>
            <Text className="testsTitleEasyMode" strong>
                Входные/Выходные типы функции (для контестов)
            </Text>

            <Space
                style={{
                    display: "flex",
                    marginBottom: 8,
                    justifyContent: "center",
                    minWidth: 120
                }}
                align="center"
            >
                <Form.Item
                    label={<Text>Входные типы </Text>}
                    name="input"
                >
                    <TagsArray color={'geekblue'} tags={inputTypes} setTags={(text) => {
                        console.log(text);
                        if (!text.length) setInputTypes([]);
                        else if (isTypeAvailable(text)) setInputTypes(text);
                    }} />
                </Form.Item>
                <Form.Item
                    label={<Text>Выходные типы </Text>}
                    name="output"
                >
                    <TagsArray color={'magenta'} tags={outputTypes} setTags={(text) => {
                        if (!text.length) setOutputTypes([]);
                        else if (isTypeAvailable(text, [...AVAILABLE_DATA_TYPES, /^(void)+$/])) setOutputTypes(text);
                    }} />
                </Form.Item>
            </Space>


            <Text className="testsTitleEasyMode" strong>
                Тесты (easy mode)
            </Text>


            <Form.List name="tests">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space
                                key={key}
                                style={{
                                    display: "flex",
                                    marginBottom: 8,
                                    justifyContent: "center",
                                }}
                                align="center"
                            >
                                <Form.Item
                                    {...restField}
                                    name={[name, "input"]}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Missing input data",
                                        },
                                    ]}
                                >
                                    <TextArea placeholder="Checker input" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, "output"]}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Missing output data",
                                        },
                                    ]}
                                >
                                    <TextArea placeholder="Excepted output" />
                                </Form.Item>
                                <Space direction="vertical">
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                    <Form.Item name={[name, "demo"]} valuePropName="checked">
                                        <Checkbox>Пример</Checkbox>
                                    </Form.Item>
                                </Space>
                            </Space>
                        ))}

                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                            >
                                Добавить тест
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="create-task-button"
                >
                    Сохранить
                </Button>
                <Button
                    type="dashed"
                    style={{ marginLeft: 5 }}
                    onClick={() => {
                        form.resetFields();
                        setInputTypes([]);
                        setOutputTypes([]);
                    }}
                >
                    Отчистить
                </Button>
            </Form.Item>
        </Form>
    )
}

export default TaskForm;