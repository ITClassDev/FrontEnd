import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Avatar, Col, Row, Button } from 'antd';
import { Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { API_URL, STORAGE } from "../config";

import { LoadingBig, LoadingSmall } from "../Components/Loading.jsx";

const { Title, Paragraph } = Typography;
const available_socials = [{ name: "userGithub", icon: <GithubOutlined />, color: "black", url: "https://github.com/" }, {name: "userTelegram", icon: <GithubOutlined />, color: "#0088CC", url: "https://t.me/"}, {name: "userStepik", icon: <GithubOutlined />, color: "#54ad54", url: "https://stepik.org/users/"}, {name: "userKaggle", icon: <GithubOutlined />, color: "#37bae8", url: "https://kaggle.com/"}] 
function fillProfile(about, name, avatar, user, socials) {

    name(`${user.firstName} ${user.lastName}`);
    about(user.userAboutText);
    avatar(`${STORAGE}/avatars/${user.userAvatarPath}`);
    let userSocial = [];
    available_socials.forEach((val) => {
        if (user[val.name]){
            userSocial.push([val.icon, user[val.name], val.color, val.url]);
        }
    });
    socials(userSocial);

}
const ProfileCard = ({ user }) => {
    const [userAbout, setUserAbout] = useState(<LoadingSmall />);
    const [userName, setUserName] = useState(<LoadingBig />);
    const [userAvatar, setUserAvatar] = useState("");
    const [userSocialNets, setUserSocialNets] = useState([]);
    useEffect(() => { fillProfile(setUserAbout, setUserName, setUserAvatar, user, setUserSocialNets); }, []);

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
                        <Paragraph editable
                        >
                            {userAbout}
                        </Paragraph>
                    </div>
                    <Row>
                        {userSocialNets.map((social, ind) => (
                            <Button type="primary" style={{ marginBottom: 10, marginRight: 10, backgroundColor: social[2] }} target={"__blank"} key={ind} icon={social[0]} href={`${social[3]}${social[1]}`}>@{social[1]}</Button>
                        ))}
                    </Row>

                </Col>
            </Row>
        </Card>
    );
}
/*

                */

export default ProfileCard;