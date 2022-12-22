import React from "react";
import { Image, Typography, Badge, Space } from "antd";
import BronzeMedal from "../Images/Medals/bronze.svg";
import SilverMedal from "../Images/Medals/silver.svg";
import GoldMedal from "../Images/Medals/gold.svg";

const { Text } = Typography;

const Terminal = ({ username, user_class, user_rating }) => {
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
          <Space direction="horizontal" style={{ marginTop: 15 }}>
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
