import React from "react";
import { Button, Result } from 'antd';


export const NotFound = () => (
    <Result
        status="404"
        title="404"
        subTitle="Такая страница не найдена"
        extra={<Button type="primary">На главную</Button>}
    />
)