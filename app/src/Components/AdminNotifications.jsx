import React, { useEffect, useState } from "react";

import { Typography, message, Button, Form, Input, Select, Space, Table, Tag } from "antd";
import { API } from "../api";
const { Title, Text } = Typography;
const { TextArea } = Input;


const AdminNotifications = () => {
    const [userGroups, setUserGroups] = useState([]);
    const [systemNotifications, setSystemNotifications] = useState([]);
    const notificationsColorMap = {
        "success": <Tag color="success">Успешно</Tag>,
        "info": <Tag color="blue">Информация</Tag>,
        "warning": <Tag color="warning">Важно</Tag>,
        "error": <Tag color="error">Очень важно!</Tag>
    }

    const getSystemNotifications = () => {
        API({
            endpoint: "/notifications/system/all", ok: (resp) => {
                setSystemNotifications(resp.data.map(notify => ({
                    uuid: notify.uuid,
                    key: notify.uuid,
                    title: notify.title,
                    content: notify.content,
                    type: notify.type,
                    active: notify.active
                })))
            }
        })
    }
    useEffect(() => {
        API({
            endpoint: "/groups", ok: (response) => {
                setUserGroups(response.data);
            }
        });
        getSystemNotifications();
    }, []);

    const deleteNotification = (uuid) => {
        API({
            endpoint: `/notifications/system/${uuid}`, method: "delete", ok: () => {
                getSystemNotifications();
            }
        });
    }

    const setSystemNotificationActiveType = (uuid, active) => {
        API({
            endpoint: `/notifications/system/${uuid}`, method: "patch", data: { "active": active }, ok: () => {
                getSystemNotifications();
            }
        });
    }

    const [messageApi, contextHolder] = message.useMessage();
    const allGlobalNotifications = [
        {
            title: "Заголовок",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Содержимое",
            dataIndex: "content",
            key: "content",
            render: (_, record) => (
                `${record.content.slice(0, 50)}...`
            )
        },
        {
            title: "Тип",
            dataIndex: "type",
            key: "type",
            render: (_, record) => (
                notificationsColorMap[record.type]
            )
        },
        {
            title: "Активное",
            dataIndex: "active",
            key: "active",
            render: (_, record) => (
                record.active ? "Да" : "Нет"
            )
        },
        {
            title: "Действия",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Space direction="horizontal">
                    <Button type="primary" onClick={() => { setSystemNotificationActiveType(record.uuid, !record.active) }}>{record.active ? "Скрыть" : "Показать"}</Button>
                    <Button type="dashed" danger onClick={() => { deleteNotification(record.uuid) }}>Удалить</Button>
                </Space>
            )
        }
    ]

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
                    API({
                        endpoint: "/notifications", method: "put", data: {
                            toGroup: values.toGroup,
                            type: values.type,
                            data: { text: values.text }
                        }, message: { show: true, api: messageApi, ok: "Уведомления успешно отправлены!", err: "Уведомления не отправлены" }
                    })
                }}
                layout="vertical"
            >
                <Form.Item
                    name="toGroup"
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
            <Title level={4} style={{ marginTop: 0 }}>
                Глобальные уведомления
            </Title>
            <Text>Глобальные уведомления показываются всем пользователям в верхней части каждой страницы.</Text>
            <Table style={{ marginTop: 20 }} columns={allGlobalNotifications} dataSource={systemNotifications} />
            <Title level={4} style={{ marginTop: 20 }}>
                Создать глобальное уведомление
            </Title>
            <Form
                name="system_notification"
                requiredMark={false}
                onFinish={(values) => {
                    API({
                        endpoint: "/notifications/system", method: "put", data: { ...values, active: true }, message: { show: true, api: messageApi, ok: "Уведомление успешно создано!", err: "Уведомление не создано!" },
                        ok: () => getSystemNotifications()

                    });
                }}
                layout="vertical"
            >
                <Form.Item
                    name="type"
                    label="Тип уведомления"
                    rules={[
                        {
                            required: true,
                            message: "Выберите тип уведомления!",
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: notificationsColorMap.success,
                                value: "success"
                            },
                            {
                                label: notificationsColorMap.info,
                                value: "info"
                            },
                            {
                                label: notificationsColorMap.warning,
                                value: "warning"
                            },
                            {
                                label: notificationsColorMap.error,
                                value: "error"
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name="title"
                    label="Заголовок"
                    rules={[
                        {
                            required: true,
                            message: "Введите заголовок уведомления",
                        },
                    ]}
                >
                    <TextArea rows={4} placeholder="Заголовок уведомления" />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Содержимое"
                    rules={[
                        {
                            required: true,
                            message: "Введите содержимое уведомления",
                        },
                    ]}
                >
                    <TextArea rows={4} placeholder="Содержимое уведомления" />
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
