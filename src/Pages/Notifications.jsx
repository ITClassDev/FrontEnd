import React from "react";
import { Alert, Button, Space, Typography } from "antd";

const { Title } = Typography;

const Notifications = () => {
    const notifications = [{
        "title": "Реклама",
        "desc": "Задонатьте пж, всё пойдёт на развитие сервиса(нет конечно же)",
        "type": "warning"
    }, {
        "title": "Реклама",
        "desc": "Задонатьте пж, всё пойдёт на развитие сервиса(нет конечно же)",
        "type": "error"
    }, {
        "title": "Реклама",
        "desc": "Задонатьте пж, всё пойдёт на развитие сервиса(нет конечно же)",
        "type": "info"
    },]
    return (
        <>
            <Title level={3}>Уведомления</Title>
            {notifications.map((notify, ind) => <Alert
                message={(<span style={{fontWeight: "bold"}}>{notify.title}</span>)}
                key={ind}
                description={notify.desc}
                type={notify.type}
                style={{marginBottom: "20px"}}
                action={
                    <Space direction="vertical">
                        <Button size="small" type="primary">
                            Подробнее
                        </Button>
                    </Space>
                }
            />)}

        </>

    )
}

export default Notifications;