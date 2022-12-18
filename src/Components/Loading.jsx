import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const LoadingBig = () => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  return (
    <>
      <span style={{ marginRight: 10 }}>Loading</span>
      <Spin indicator={antIcon} />
    </>
  );
};

export const LoadingSmall = () => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 15,
      }}
      spin
    />
  );
  return (
    <>
      <span style={{ marginRight: 5 }}>Loading</span>
      <Spin indicator={antIcon} />
    </>
  );
};

export const LoadingHorizCenter = () => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 30,
      }}
      spin
    />
  );
  return (
    <div style={{ textAlign: "center" }}>
      <Spin indicator={antIcon} />
    </div>
  );
};

export default LoadingBig;
