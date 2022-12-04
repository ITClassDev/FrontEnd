import React, { useEffect, useState } from "react";
import { API_URL, STORAGE } from "../config";
import { Descriptions } from "antd";
import axios from "axios";


const measure_time = async (setTime) => {
    const request_start_at = performance.now();

    const response = await axios.get(API_URL);

    const request_end_at = performance.now();
    const request_duration = request_end_at - request_start_at;

    if (response.status === 200) {
      setTime(`${Math.round(request_duration)} ms`);
    }
} 


const Admin = () => {
    const [timeToApi, setTimeToApi] = useState("waiting...");
    useEffect(() => {measure_time(setTimeToApi)}, [])
    return (
        <>
            <h1>Админка</h1>
            <div>
                <Descriptions title="Debug" bordered>
                    <Descriptions.Item label="API">{API_URL}</Descriptions.Item>
                    <Descriptions.Item label="Storage">{STORAGE}</Descriptions.Item>
                    <Descriptions.Item label="Req to REST time">{timeToApi}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
}

export default Admin;