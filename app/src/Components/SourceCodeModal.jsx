import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
    a11yLight,
    a11yDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Modal, Button } from "antd"
import { ExclamationCircleFilled } from '@ant-design/icons';
import { API } from "../api";
const { confirm } = Modal;

export const SourceCodeModal = ({ sourceCode, submitId, show, hideCallback, onReject, language = "c++" }) => (
    <Modal title="Исходный код решения" open={show} onOk={() => { hideCallback() }} onCancel={() => { hideCallback() }} width={1000} footer={[
        <Button key="reject" type="primary" danger onClick={() => {
            confirm({
                title: 'Вы действительно хотите отклонить данную посылку?',
                icon: <ExclamationCircleFilled />,
                content: 'Это конечно можно отменить, но интерфейса для этого пока нет!',
                async onOk() {
                    API({
                        endpoint: `/assigments/submit/${submitId}/reject`, method: "delete", ok: () => {
                            onReject();
                            hideCallback();
                        }
                    });
                },
                onCancel() { },
            });
        }}>
            Отклонить
        </Button>

    ]}>
        <SyntaxHighlighter
            language={sourceCode.language}
            style={a11yDark}
            showLineNumbers
            lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
            wrapLines={true}
        >
            {sourceCode.source}
        </SyntaxHighlighter>
    </Modal>
)