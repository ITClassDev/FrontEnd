import { Card, Form, Input, Button, Row, Space } from "antd";
import React from "react";

const Settings = ({ user }) => {
  return (
    <>
      <h1>Настройки аккаунта {user.id}</h1>
      
        <Card title={"Социальные привязки"} style={{ marginBottom: 20 }}>
          <Space direction="vertical">
            <div>TG</div>
            <div>GitHub</div>
            <div>Stepik</div>
            <div>Kaggle</div>
          </Space>
        </Card>
      
      <Card title={"Вход и безопасность"} style={{ marginBottom: 20 }}>
        Change password + connect two auth via email
      </Card>

      <Card title={"TODO"} style={{ marginBottom: 20 }}>
        Change password; Change social links; change description of profile
      </Card>
    </>
  );
};

export default Settings;
