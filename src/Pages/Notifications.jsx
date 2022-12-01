import React from "react";
import { Alert, Button, Space } from "antd";

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
            <h1>Уведомления</h1>
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