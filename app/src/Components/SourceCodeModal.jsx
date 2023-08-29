import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
    a11yLight,
    a11yDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Modal } from "antd"

export const SourceCodeModal = ({ sourceCode, show, hideCallback, language = "python" }) => (
    <Modal title="Исходный код решения" open={show} onOk={() => { hideCallback() }} onCancel={() => { hideCallback() }} width={1000}>
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