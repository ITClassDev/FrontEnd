import React from "react";
import { Typography} from 'antd';
import useDocumentTitle from "../useDocumentTitle";
const { Title } = Typography;


export const Projects = () => {
    useDocumentTitle("ШТП | Ваши проекты");
    return (
        <>
            <Title level={3}>Ваши проеты</Title>
        </>
    );
}

