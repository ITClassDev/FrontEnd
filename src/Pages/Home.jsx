import React, { useState, useEffect } from "react";
import { Card, Avatar, Col, Row, Button } from 'antd';
import { getUser } from "../api";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";
import { Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const { Title } = Typography;


const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    getUser(() => { console.log("Auth") }, () => { navigate("/login") }, API_URL);
  });

  return (
    <>
      <Card
        title="Ваш профиль"
        bordered={false}
      >
        <Row align="middle">
          <Col>
            <Avatar src="http://localhost:8080/storage/avatars/1_avatar.png" size={100} />
          </Col>
          <Col style={{ marginLeft: 20 }}>
            <Title level={2}>Степан Жданов</Title>
            <Row>
              <Button type="primary" icon={<GithubOutlined />} style={{marginRight: 10}}>
                @ret7020
              </Button>
              <Button type="primary" icon={<GithubOutlined />}>
                @ret7020
              </Button>
            </Row>
          </Col>

        </Row>

      </Card>
    </>

  )
}

export default Home;