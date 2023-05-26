import React, { useState, useContext } from "react";
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
  Tag
} from "antd";
import { GithubOutlined, GlobalOutlined } from "@ant-design/icons";
import { config } from "../config";
import { API } from "../api";
import Terminal from "./Terminal";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import Telegram_logo from "../Images/Telegram_logo.svg";
import Stepik_logo from "../Images/Stepik_logo.png";
import Kaggle_logo from "../Images/Kaggle_logo.svg";
import userContext from "../Contexts/user";

const STORAGE = config.STORAGE;
const { Title, Paragraph } = Typography;

const available_socials = [
  {
    name: "userGithub",
    icon: <GithubOutlined />,
    color: "black",
    url: "https://github.com/",
    prefix: "@",
  },
  {
    name: "userTelegram",
    icon: <Image src={Telegram_logo} width={17} preview={false} />,
    color: "#0088CC",
    url: "https://t.me/",
    prefix: "@",
  },
  {
    name: "userStepik",
    icon: <Image src={Stepik_logo} width={17} preview={false} />,
    color: "#2c2c2c",
    url: "https://stepik.org/users/",
    prefix: "@",
  },
  {
    name: "userKaggle",
    icon: <Image src={Kaggle_logo} width={17} preview={false} />,
    color: "#baedff",
    url: "https://kaggle.com/",
    prefix: "@",
  },
  {
    name: "userWebsite",
    icon: <GlobalOutlined />,
    color: "black",
    url: "",
    prefix: "",
  },
];

const ProfileCard = ({
  userInfo,
  editable = false,
  header_title = "Ваш профиль",
}) => {

  const { setUser } = useContext(userContext);

  const [userAbout, setUserAbout] = useState(userInfo.userAboutText);
  //FIXIT ONLY FOR DEV, WHILE WE DON'T KNOW WHERE TO CHANGE THIS STATE; to pass CI build
  // eslint-disable-next-line
  const [userAvatar, setUserAvatar] = useState(
    `${STORAGE}/avatars/${userInfo.userAvatarPath}`
  );
  let userSocial = [];
  available_socials.forEach((val) => {
    if (userInfo[val.name])
      userSocial.push([
        val.icon,
        userInfo[val.name],
        val.color,
        val.url,
        val.prefix,
      ]);
  });
  const [userSocialNets] = useState(userSocial);
  // FIXIT ONLY FOR DEV, WHILE WE DON'T KNOW WHERE TO CHANGE THIS STATE; to pass CI build
  // eslint-disable-next-line
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
  if (editable) editable = {
    onChange: (new_text) => API({
      endpoint: "/users", method: "patch", data: { aboutText: new_text }, ok: (resp) => {
        setUserAbout(resp.data.userAboutText);
        setUser(({ userInfo: Object.assign({}, userInfo, { userAboutText: resp.data.userAboutText }), loggedIn: true, loading: false }));
      }
    })
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
                {userInfo.firstName} {userInfo.lastName}
              </Title>
              <Paragraph style={{ marginBottom: 3 }} editable={editable}>
                {userAbout}
              </Paragraph>
              <Tag color={userInfo.userRole === 0 ? "blue" : (userInfo.userRole === 1 ? "green" : "red")}>
                {userInfo.userRole === 0 ? "Ученик" : (userInfo.userRole === 1 ? "Преподаватель" : "Администратор")}
              </Tag>
            </div>
            <Row>
              {userSocialNets.map((social, ind) => (
                <Popover
                  content={`${social[4]}${social[1]}`}
                  placement="bottom"
                  key={ind}
                >
                  <Button
                    type="primary"
                    style={{
                      marginBottom: 10,
                      marginRight: 10,
                      backgroundColor: social[2],
                    }}
                    target={"__blank"}
                    href={`${social[3]}${social[1]}`}
                  >
                    {social[0]}
                  </Button>
                </Popover>
              ))}
            </Row>
            {(userInfo["techStack"] && userInfo.userRole !== 0) && <li>
              <Row gutter={[5, 5]}>{userInfo["techStack"].split(",").map((item, id) => (<Tag key={id}>{item}</Tag>))}</Row>
            </li>}
          </Col>
        </Row>
      </Card>
      {userInfo.userRole === 0 && (
        <>
          <Card title="Информация" bordered={false} style={{ marginTop: 20 }}>
            <Terminal
              username={userInfo.firstName}
              user_class={userInfo["learningClass"]}
              user_rating={userInfo.rating}
              user_tech_stack={userInfo["techStack"]}
            />
          </Card>
          <Card title="График" bordered={false} style={{ marginTop: 20 }}>
            <Calendar locale={locale} dateCellRender={dateCellRender} />
          </Card>
        </>
      )}
    </>

  );
};

export default ProfileCard;
