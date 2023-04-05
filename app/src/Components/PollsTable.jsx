import React, { useState } from "react";
import { Table, Space, Button, Modal, QRCode, Row, Image, message } from "antd";
import { GlobalOutlined, CopyOutlined } from "@ant-design/icons";
import { FRONTEND_URL } from "../config";
import Telegram_logo from "../Images/Telegram_logo.svg";
import { API } from "../api";

const ShareModal = ({ shareModalOpen, setShareModalOpen, messageApi, poll_id }) => {
    let poll_url = `${FRONTEND_URL}/poll?id=${poll_id}`;
    return (<Modal open={shareModalOpen} onCancel={() => { setShareModalOpen(false) }} footer={[]} transitionName="">
        <Row style={{ display: "flex", justifyContent: "center" }}>
            <QRCode value={poll_url} />
        </Row>
        <Row style={{ display: "flex", justifyContent: "center", paddingTop: "20px", gap: "10px" }}>
            <Image src={Telegram_logo} width={40} preview={false} style={{ cursor: "pointer" }} onClick={() => { window.open(`https://t.me/share/url?url=${poll_url}&text=ShTP-PollsService`) }} />
            <GlobalOutlined style={{ fontSize: 40 }} onClick={() => { window.open(poll_url) }} />
            <CopyOutlined style={{ fontSize: 40, cursor: "pointer" }} onClick={() => {
                navigator.clipboard.writeText(poll_url);
                messageApi.open({
                    type: 'success',
                    content: 'Ссылка на опрос скопирована!',
                });
            }} />
        </Row>
    </Modal>);
}

const ResultsModal = ({ resultsModalOpen, setResultsModalOpen, poll_id, resultsTableData }) => {
    return (
        <Modal open={resultsModalOpen} onCancel={() => { setResultsModalOpen(false) }} transitionName="" footer={[<Button type="dashed" key="download_xlsx" onClick={() => { window.open(`${FRONTEND_URL}/polls`) }}>Скачать xlsx</Button>]} title={`Количество ответов: ${"N/A"}`}>
            <Table columns={[{ title: "ID", dataIndex: "id", key: "id" }, { title: "Дата", dataIndex: "date", key: "date" }, { title: "Действия", dataIndex: "actionsBtns", key: "actionsBtns" }]} />
        </Modal>
    )
}


const PollsTable = ({ polls }) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedPoll, setSelectedPoll] = useState(-1);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [resultsModalOpen, setResultsModalOpen] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);

    const [resultsTableData, setResultsTableData] = useState([]);

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
            render: (_, record) => (
                <Space direction="horizontal">
                    <Button type="primary" onClick={() => { setSelectedPoll(record.id); setResultsModalOpen(1); }}>Результаты</Button>
                    <Button type="dashed" onClick={() => { setSelectedPoll(record.id); setShareModalOpen(1); }}>Поделиться</Button>
                    <Button type="dashed">Редактировать</Button>
                </Space>
            ),

        },
    ];

    return (<>
        {contextHolder}
        <ShareModal shareModalOpen={shareModalOpen} setShareModalOpen={setShareModalOpen} messageApi={messageApi} poll_id={selectedPoll} />
        <ResultsModal resultsModalOpen={resultsModalOpen} setResultsModalOpen={setResultsModalOpen} poll_id={selectedPoll} resultsTableData={resultsTableData} />
        <Table columns={pollTableColumns} dataSource={polls} />
    </>);
}

export default PollsTable;