import React, { useState, useEffect } from "react";
import { Card, Avatar, Col, Row, Button } from 'antd';
import { getUser } from "../api";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";
import { Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;


const socialLinks = { userGithub: { base: "https://github.com/", icon: <GithubOutlined /> } };


const Home = () => {
  const userSocial = [["userGithub", "ret7020"]];
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
            <div style={{marginBottom: 10}}>
              <Title level={2} style={{marginBottom: 0}}>Степан Жданов</Title>
              <Text type="secondary">ML, DS, Web, Firmware dev</Text>
            </div>
            <Row>
              {userSocial.map((social) => (
                <Button type="primary" href={`${socialLinks[social[0]].base}${social[1]}`} target={"__blank"}>{socialLinks[social[0]].icon}@{social[1]}</Button>
              ))}
            </Row>
          </Col>

        </Row>

      </Card>
    </>

  )
}

export default Home;