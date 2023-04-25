import React from "react";
import { Spin } from "antd";

export const PageLoading = () => (
    <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Spin size='large' />
    </div>
);