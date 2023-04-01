import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, QRCode, Row, Image } from "antd";
import { FRONTEND_URL } from "../config";
import Telegram_logo from "../Images/Telegram_logo.svg";

const ShareModal = ({ editModalOpen, setEditModalOpen }) => (
    <Modal open={editModalOpen} onCancel={() => { setEditModalOpen(false) }} footer={[]} transitionName="">
        <Row style={{display: "flex", justifyContent: "center"}}>
            <QRCode value={`${FRONTEND_URL}/poll?id=${123}`} />
        </Row>
        <Row style={{display: "flex", justifyContent: "center", paddingTop: "20px"}}>
            <Image src={Telegram_logo} width={40} preview={false} style={{cursor: "pointer"}} onClick={() => {window.open(`https://t.me/share/url?url=${FRONTEND_URL}/poll?id=${123}&text=ShTP-PollsService`)}}/>
            
        </Row>
    </Modal>
)

const PollsTable = () => {
    useEffect(() => {
        console.log("Static update");
    }, []);
    const [polls, setPolls] = useState([{
        key: 1,
        id: 1313243,
        title: "Ассоциальный соц. опрос",
        description: "Ассоциальный соц. опрос от Путинцева",
        actionsBtns: <Space direction="horizontal">
            <Button type="primary">Редактировать</Button>
            <Button type="dashed">Результаты</Button>
            <Button type="dashed" onClick={() => { setEditModalOpen(true); }}>Поделиться</Button>
            <Button danger>Удалить</Button>
        </Space>
    }]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [resultsModalOpen, resultsEditModalOpen] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);

    const pollTableColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Название",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Описание",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Действия",
            dataIndex: "actionsBtns",
            key: "actionsBtns",
        },
    ];

    return (<>
        <ShareModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} />
        <Table columns={pollTableColumns} dataSource={polls} />
    </>);
}

export default PollsTable;