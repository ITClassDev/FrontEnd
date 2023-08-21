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
                <Image src="https://sun6-22.userapi.com/impg/UdIuvvzhLqKfCH5QVfILMrxO4_16vomLk9fdfg/jtHUhANiJPw.jpg?size=604x548&quality=96&sign=0184ac1485ee1fc0a041cc6a05aadf61&type=album"/>
            </Space>
        </>
    );
}

