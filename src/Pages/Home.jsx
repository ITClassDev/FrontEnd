import React, { useState, useEffect } from "react";
import {LoadingBig, LoadingSmall} from "../Components/Loading.jsx";
import { Card, Avatar, Col, Row, Button } from 'antd';
import { getUser } from "../api";
import { API_URL, STORAGE } from "../config";
import { useNavigate } from "react-router-dom";
import { Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
const { Title, Paragraph } = Typography;


const socialLinks = { userGithub: { base: "https://github.com/", icon: <GithubOutlined /> } };

function inlineUpdateProfile(new_text, state_hook) {
  state_hook(new_text);
}

function fillProfile(about, name, avatar, user) {
  name(`${user.firstName} ${user.lastName}`);
  about(user.userAboutText);
  avatar(`${STORAGE}/avatars/${user.userAvatarPath}`);
}


const Home = () => {
  
  const userSocial = [["userGithub", "ret7020"], ["userGithub", "ret7020"], ["userGithub", "ret7020"], ["userGithub", "ret7020"], ["userGithub", "ret7020"]];
  const [userAbout, setUserAbout] = useState(<LoadingSmall/>);
  const [userName, setUserName] = useState(<LoadingBig/>);
  const [userAvatar, setUserAvatar] = useState("");
  const navigate = useNavigate();
  //useEffect(() => {
  //  getUser((resp) => { fillProfile(setUserAbout, setUserName, setUserAvatar, resp.data.user) }, () => { navigate("/login") }, API_URL);
  //});

  return (
    <>
      <Card
        title="Ваш профиль"
        bordered={false}
      >
        <Row align="middle">
          <Col>
            <Avatar src={userAvatar} size={100} />
          </Col>
          <Col style={{ marginLeft: 20 }}>
            <div style={{ marginBottom: 10 }}>
              <Title level={2} style={{ marginBottom: 0 }}>{userName}</Title>
              <Paragraph
                editable={{
                  onChange: (text => { inlineUpdateProfile(text, setUserAbout) }),
                }}
              >
                {userAbout}
              </Paragraph>

            </div>
            <Row>
              {userSocial.map((social, ind) => (
                <Button type="primary" style={{ marginBottom: 10, marginRight: 10 }} href={`${socialLinks[social[0]].base}${social[1]}`} target={"__blank"} key={ind}>{socialLinks[social[0]].icon}@{social[1]}</Button>
              ))}
            </Row>
          </Col>

        </Row>

      </Card>
    </>

  )
}

export default Home;