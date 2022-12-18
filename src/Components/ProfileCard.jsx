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
} from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { STORAGE } from "../config";
import { updateUserAbout } from "../api";
import { LoadingBig, LoadingSmall } from "../Components/Loading.jsx";
import Terminal from "./Terminal";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";

//import Icon from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// const TelegramLogoSvg = () => (

//    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="24px" height="24px"><path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"/><path fill="#fff" d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"/><path fill="#b0bec5" d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"/><path fill="#cfd8dc" d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"/></svg>
// );
// const TelegramIcon = (props) => <Icon component={TelegramLogoSvg} {...props} />;

const available_socials = [
  {
    name: "userGithub",
    icon: <GithubOutlined />,
    color: "black",
    url: "https://github.com/",
  },
  {
    name: "userTelegram",
    icon: <GithubOutlined />,
    color: "#0088CC",
    url: "https://t.me/",
  },
  {
    name: "userStepik",
    icon: <GithubOutlined />,
    color: "#54ad54",
    url: "https://stepik.org/users/",
  },
  {
    name: "userKaggle",
    icon: <GithubOutlined />,
    color: "#37bae8",
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
                <Button
                  type="primary"
                  style={{
                    marginBottom: 10,
                    marginRight: 10,
                    backgroundColor: social[2],
                  }}
                  target={"__blank"}
                  key={ind}
                  icon={social[0]}
                  href={`${social[3]}${social[1]}`}
                >
                  @{social[1]}
                </Button>
              ))}
            </Row>
          </Col>
        </Row>
      </Card>
      <Card title="Информация" bordered={false} style={{ marginTop: 20 }}>
        <Terminal />
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
