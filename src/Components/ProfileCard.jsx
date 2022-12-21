import React, { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  Avatar,
  Col,
  Row,
  Button,
  Image,
  Typography,
  Calendar,
  Badge,
  Popover,
} from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { STORAGE } from "../config";
import { updateUserAbout } from "../api";
import { LoadingBig, LoadingSmall } from "../Components/Loading.jsx";
import Terminal from "./Terminal";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import Telegram_logo from "../Images/Telegram_logo.svg";
import Stepik_logo from "../Images/Stepik_logo.png";
import KaggleLogo from "../Images/Kaggle_logo.svg";

const { Title, Paragraph } = Typography;

const available_socials = [
  {
    name: "userGithub",
    icon: <GithubOutlined />,
    color: "black",
    url: "https://github.com/",
  },
  {
    name: "userTelegram",
    icon: <Image src={Telegram_logo} width={17} preview={false} />,
    color: "#0088CC",
    url: "https://t.me/",
  },
  {
    name: "userStepik",
    icon: <Image src={Stepik_logo} width={17} preview={false} />,
    color: "#2c2c2c",
    url: "https://stepik.org/users/",
  },
  {
    name: "userKaggle",
    icon: <Image src={KaggleLogo} width={17} preview={false} />,
    color: "#baedff",
    url: "https://kaggle.com/",
  },
];
function fillProfile(about, name, avatar, user, socials) {
  name(`${user.firstName} ${user.lastName}`);
  about(user.userAboutText);
  avatar(`${STORAGE}/avatars/${user.userAvatarPath}`);
  let userSocial = [];
  available_socials.forEach((val) => {
    if (user[val.name])
      userSocial.push([val.icon, user[val.name], val.color, val.url]);
  });
  socials(userSocial);
}

const ProfileCard = ({ user, header_title = "Ваш профиль" }) => {
  const [userAbout, setUserAbout] = useState(<LoadingSmall />);
  const [userName, setUserName] = useState(<LoadingBig />);
  const [userAvatar, setUserAvatar] = useState("");
  const [userSocialNets, setUserSocialNets] = useState([]);
  const [timelineEvents, setTimelineEvents] = useState({
    "Sat Dec 31 2022": [
      { type: "warning", text: "Str middle deadline" },
      { type: "warning", text: "Str hard deadline" },
      { type: "error", text: "Str someshit deadline" },
    ],
    "Mon Dec 12 2022": [
      { type: "warning", text: "NTO second tour" },
      { type: "success", text: "Project predemo" },
    ],
  });
  useEffect(() => {
    fillProfile(
      setUserAbout,
      setUserName,
      setUserAvatar,
      user,
      setUserSocialNets
    );
  }, [user]);
  function setProfileAboutText(new_text) {
    updateUserAbout(
      new_text,
      (resp) => {
        setUserAbout(new_text);
      },
      () => {}
    );
  }
  const dateCellRender = (value) => {
    const date_string = value.$d.toDateString();
    if (date_string in timelineEvents) {
      return (
        <ul className="eventInCalendar">
          {timelineEvents[date_string].map((item) => (
            <li key={item.text}>
              <Badge status={item.type} text={item.text} />
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <>
      <Card title={header_title} bordered={false}>
        <Row align="middle">
          <Col>
            <Avatar src={<Image src={userAvatar} />} size={100} />
          </Col>
          <Col style={{ marginLeft: 20 }}>
            <div style={{ marginBottom: 10 }}>
              <Title level={2} style={{ marginBottom: 0 }}>
                {userName}
              </Title>
              <Paragraph editable={{ onChange: setProfileAboutText }}>
                {userAbout}
              </Paragraph>
            </div>
            <Row>
              {userSocialNets.map((social, ind) => (
                <Popover content={`@${social[1]}`} placement="bottom">
                  <Button
                    type="primary"
                    style={{
                      marginBottom: 10,
                      marginRight: 10,
                      backgroundColor: social[2],
                    }}
                    target={"__blank"}
                    key={ind}
                    href={`${social[3]}${social[1]}`}
                  >
                    {social[0]}
                  </Button>
                </Popover>
              ))}
            </Row>
          </Col>
        </Row>
      </Card>
      <Card title="Информация" bordered={false} style={{ marginTop: 20 }}>
        <Terminal
          username={user.firstName}
          user_class={user.learningClass}
          user_rating={user.rating}
        />
      </Card>
      <Card title="График" bordered={false} style={{ marginTop: 20 }}>
        <Calendar
          headerRender={() => {}}
          locale={locale}
          dateCellRender={dateCellRender}
        />
      </Card>
    </>
  );
};

export default ProfileCard;
