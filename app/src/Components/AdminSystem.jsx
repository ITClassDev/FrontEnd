import React, {useEffect, useState} from "react";
import { config } from "../config";
import { Descriptions, Typography } from "antd";
import axios from "axios";


const { Text } = Typography;

const API_URL = config.API_URL;
const STORAGE = config.STORAGE;


const AdminSystem = () => {
  const [timeToApi, setTimeToApi] = useState("waiting...");
  const [backendCPU, setBackendCPU] = useState("waiting...");
  const [backendRAM, setBackendRAM] = useState("waiting...");
  useEffect(() => {
    measure_time(setTimeToApi, setBackendCPU, setBackendRAM);
  }, []);
  const measure_time = async (setTime, setCPU, setRAM) => {
    const request_start_at = performance.now();

    const response = await axios.get(API_URL.replace("api/v1", ""));

    const request_end_at = performance.now();
    const request_duration = request_end_at - request_start_at;

    if (response.status === 200) {
      setTime(`${Math.round(request_duration)} ms`);
      // setCPU(response.data.system_status.cpu);
      // setRAM(response.data.system_status.ram);
    }
  };

  return (
    <>
      <div>
        <Descriptions title="System info (NOT realtime)" bordered>
          <Descriptions.Item label="API">{API_URL}</Descriptions.Item>
          <Descriptions.Item label="Storage">{STORAGE}</Descriptions.Item>
          <Descriptions.Item label="Req to REST time">
            {timeToApi}
          </Descriptions.Item>
          <Descriptions.Item label="RAM usage">{backendRAM}%</Descriptions.Item>
          <Descriptions.Item label="CPU usage">{backendCPU}%</Descriptions.Item>
          <Descriptions.Item label="API time">N/A</Descriptions.Item>
        </Descriptions>
      </div>
      <Text>Дистрибутив ShTP Project для школы 1561: Licensed with </Text>
    </>
  );
};

export default AdminSystem;
