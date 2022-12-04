import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Avatar, Col, Row, Button } from 'antd';
import { Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { API_URL, STORAGE } from "../config";

import { LoadingBig, LoadingSmall } from "../Components/Loading.jsx";

const { Title, Paragraph } = Typography;
function fillProfile(about, name, avatar, user) {
    name(`${user.firstName} ${user.lastName}`);
    about(user.userAboutText);
    avatar(`${STORAGE}/avatars/${user.userAvatarPath}`);
}
const ProfileCard = ({ user }) => {
    const [userAbout, setUserAbout] = useState(<LoadingSmall />);
    const [userName, setUserName] = useState(<LoadingBig />);
    const [userAvatar, setUserAvatar] = useState("");
    useEffect(() => {fillProfile(setUserAbout, setUserName, setUserAvatar, user);}, []);

    return (
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
                        >
                            {userAbout}
                        </Paragraph>

                    </div>

                </Col>
            </Row>
        </Card>
    );
}
/*
<Row>
                    {userSocial.map((social, ind) => (
                        <Button type="primary" style={{ marginBottom: 10, marginRight: 10 }} href={`${socialLinks[social[0]].base}${social[1]}`} target={"__blank"} key={ind}>{socialLinks[social[0]].icon}@{social[1]}</Button>
                    ))}
                </Row>
                */

export default ProfileCard;