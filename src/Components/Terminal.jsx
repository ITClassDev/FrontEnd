import React from "react";
import { Image, Typography, Badge, Space, Row, Tag } from "antd";
import BronzeMedal from "../Images/Medals/bronze.svg";
import SilverMedal from "../Images/Medals/silver.svg";
import GoldMedal from "../Images/Medals/gold.svg";

const { Text } = Typography;

const Terminal = ({ username, user_class, user_rating }) => {
  const techStackExample = "python,c++,figma,fastapi,vscode,js,html5,css3,reactjs,web3";
  return (
    <>
      <div>
        <li>
          <Text style={{ color: "#1793d1" }} strong>
            {username}
          </Text>
          @
          <Text style={{ color: "#1793d1" }} strong>
            1561
          </Text>
        </li>
        <li>
          <Text style={{ color: "#1793d1" }} strong>
            Class
          </Text>
          : {user_class}
        </li>
        <li>
          <Text style={{ color: "#1793d1" }} strong>
            Rating points
          </Text>
          : {user_rating}
        </li>
        <li>
          <Text style={{ color: "#1793d1" }} strong>
            Tasks Solved
          </Text>
          : N/A
        </li>
        <li>
          <Space direction="vertical">
            <Text style={{ color: "#1793d1" }} strong>
              Tech Stack
            </Text>
            <Row gutter={[5, 5]}>{techStackExample.split(",").map((item) => (<Tag>{item}</Tag>))}</Row>
          </Space>
        </li>
        <li>
          <Space direction="horizontal" style={{ marginTop: 20 }}>
            <Badge count={0} showZero>
              <Image src={BronzeMedal} width={30} preview={false} />
            </Badge>
            <Badge count={0} showZero>
              <Image src={SilverMedal} width={30} preview={false} />
            </Badge>
            <Badge count={0} showZero>
              <Image src={GoldMedal} width={30} preview={false} />
            </Badge>
          </Space>
        </li>
      </div>
    </>
  );
};

export default Terminal;
