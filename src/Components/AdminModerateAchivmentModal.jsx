import { Button, Modal, Space } from "antd";
import React from "react";

const AdminModerateAchivmentModal = ({isOpen, setOpen, achivmentText}) => {
    return (
        <Modal title="Достижение" open={isOpen} onCancel={() => {setOpen(false)}} footer={<></>}>
            <p>{achivmentText}</p>
            <Space direction="horizontal">
                <Button style={{backgroundColor: "#00c700"}} type="primary">Принять</Button>
                <Button danger>Отклонить</Button>
            </Space>
        </Modal>
    );
}

export default AdminModerateAchivmentModal;