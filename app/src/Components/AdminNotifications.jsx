import React, { useEffect, useState } from "react";

import { Typography, message, Button, Form, Input, Select } from "antd";
import { API } from "../api";
const { Title } = Typography;
const { TextArea } = Input;


const AdminNotifications = () => {
    const [userGroups, setUserGroups] = useState([]);
    useEffect(() => {
        API({
            endpoint: "/groups", ok: (response) => {
                setUserGroups(response.data);
            }
        })
    }, []);
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            <Title level={4} style={{ marginTop: 0 }}>
                Отправить уведомления
            </Title>
            <Form
                name="send_notifications"
                requiredMark={false}
                className="send_notifications"
                onFinish={(values) => {
                    API({ endpoint: "/notifications", method: "put", data: values, message: { show: true, api: messageApi, ok: "Уведомления успешно отправлены!", err: "Уведомления не отправлены" } })
                }}
                layout="vertical"
            >
                <Form.Item
                    name="groupId"
                    label="Группа пользователей"
                    rules={[
                        {
                            required: true,
                            message: "Выберите группу пользователей",
                        },
                    ]}
                >
                    <Select
                        options={userGroups.map((item) => ({
                            value: item.uuid,
                            label: item.name,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="Категория уведомления"
                    rules={[
                        {
                            required: true,
                            message: "Выберите категорию уведомления",
                        },
                    ]}
                >
                    <Select
                        options={[{ value: 4, label: "Информация" }, { value: 5, label: "Предупреждение" }]}
                    />
                </Form.Item>
                <Form.Item
                    name="text"
                    label="Текст уведомления"
                    rules={[
                        {
                            required: true,
                            message: "Введите текст уведомления",
                        },
                    ]}
                >
                    <TextArea rows={4} placeholder="Текст уведомления" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="send-notification">
                        Отправить
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default AdminNotifications;
