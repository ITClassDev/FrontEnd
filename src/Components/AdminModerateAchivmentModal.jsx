import { Modal, Space } from "antd";
import React from "react";

const AdminModerateAchivmentModal = ({isOpen, setOpen, achivmentText}) => {
    return (
        <Modal title="Достижение" open={isOpen} onCancel={() => {setOpen(false)}} footer={<></>}>
            <p>{achivmentText}</p>
            <Space>
                
            </Space>
        </Modal>
    );
}

export default AdminModerateAchivmentModal;