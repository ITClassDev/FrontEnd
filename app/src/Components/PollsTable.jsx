import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, QRCode, Row, Image, message } from "antd";
import { GlobalOutlined, CopyOutlined } from "@ant-design/icons";
import { FRONTEND_URL } from "../config";
import Telegram_logo from "../Images/Telegram_logo.svg";
import { API } from "../api";

const ShareModal = ({ editModalOpen, setEditModalOpen, messageApi, poll_id }) => {
    let poll_url = `${FRONTEND_URL}/poll?id=${poll_id}`;
    return (<Modal open={editModalOpen} onCancel={() => { setEditModalOpen(false) }} footer={[]} transitionName="">
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

const PollsTable = ({polls, setPolls}) => {
    const [messageApi, contextHolder] = message.useMessage();
    // useEffect(() => {
    //     API({
    //         endpoint: "/polls", ok: (resp) => {
    //             let tmp = [];
    //             resp.data.forEach(poll => {
    //                 tmp.push({
    //                     key: poll.id,
    //                     id: poll.id,
    //                     title: poll.title,
    //                     description: poll.description,
    //                     actionsBtns: <Space direction="horizontal">
    //                         <Button type="primary">Редактировать</Button>
    //                         <Button type="dashed" onClick={() => {
    //                             setSelectedPoll(poll.id);
    //                             setResultsModalOpen(true);
    //                             API({
    //                                 endpoint: `/polls/${poll.id}/answers`, ok: (resp) => {
    //                                     //setResultsModalOpen(resp.data);
    //                                 }
    //                             })
    //                         }}>Результаты</Button>
    //                         <Button type="dashed" onClick={() => {
    //                             setSelectedPoll(poll.id);
    //                             setEditModalOpen(true);
    //                         }}>Поделиться</Button>
    //                         <Button danger>Удалить</Button>
    //                     </Space>
    //                 });
    //             });
    //             setPolls(tmp);
    //         }
    //     });
    // }, []);
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
        },
    ];

    return (<>
        {contextHolder}
        <ShareModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} messageApi={messageApi} poll_id={selectedPoll} />
        <ResultsModal resultsModalOpen={resultsModalOpen} setResultsModalOpen={setResultsModalOpen} poll_id={selectedPoll} resultsTableData={resultsTableData} />
        <Table columns={pollTableColumns} dataSource={polls} />
    </>);
}

export default PollsTable;