import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Typography } from "antd";

const { Text } = Typography;


export const LoadingBar = ({ size, align="none", text=null }) => {
  return (
    <div style={{ textAlign: align }}>
      {text && <Text style={{ marginRight: 5 }}>{text}</Text>}
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: size,
            }}
            spin
          />
        }
      />
    </div>
  );
};

export default LoadingBar;
