import React from "react";
import { Typography, Image, Space} from 'antd';
import useDocumentTitle from "../useDocumentTitle";
const { Title, Text } = Typography;


export const Projects = () => {
    useDocumentTitle("ШТП | Ваши проекты");
    return (
        <>
            <Title level={3}>Ваши проекты</Title>
            <Space direction="vertical">
                <Text>Данный модуль будет реализован в ShTP 2.0.1</Text>
                <Image src="/notimplemented.png"/>
            </Space>
        </>
    );
}

