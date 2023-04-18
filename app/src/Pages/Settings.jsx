import {
  Card,
  Col,
  Row,
  Typography,
  Form,
  Input,
  Button,
  Image,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import React, { useState } from "react";
import Telegram_logo from "../Images/Telegram_logo.svg";
import Stepik_logo from "../Images/Stepik_logo.png";
import Kaggle_logo from "../Images/Kaggle_logo.svg";
import {
  GithubOutlined,
  LockOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { config } from "../config";
import { API } from "../api";

const STORAGE = config.STORAGE;
const API_URL = config.API_URL;

// FIXIT; for dev purpose
window.API = API;

const { Title } = Typography;

// FIXIT AUTOMAP from array
const Settings = ({ user }) => {
  const defaultStackExamples = [
    { value: "Python", label: "Python" },
    { value: "C++", label: "C++" },
    { value: "ReactJS", label: "ReactJS" },
    { value: "JS", label: "JS" },
    { value: "HTML5", label: "HTML5" },
    { value: "CSS3", label: "CSS3" },
    { value: "Scratch", label: "Scratch" },
    { value: "FastAPI", label: "FastAPI" },
    { value: "Django", label: "Django" },
    { value: "Flask", label: "Flask" },
    { value: "NextJS", label: "NextJS" },
    { value: "Git", label: "Git" },
    { value: "Docker", label: "Docker" },
    { value: "Linux", label: "Linux" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Bootstrap", label: "Bootstrap" },
    { value: "MySQL", label: "MySQL" },
    { value: "PostgreSQL", label: "PostgreSQL" },
    { value: "Tensorflow", label: "Tensorflow" },
    { value: "PyTorch", label: "PyTorch" },
    { value: "Pandas", label: "Pandas" },
    { value: "SkLearn", label: "SkLearn" },
    { value: "Saas", label: "Saas" },
    { value: "Nginx", label: "Nginx" },
    { value: "Apache", label: "Apache" },
  ];
  const [messageApi, contextHolder] = message.useMessage();


  const [avatarImageUrl, setAvatarImageUrl] = useState(`${STORAGE}/avatars/${user.user.userAvatarPath}?nocache=${Date.now()}`);
  let tech_stack_default;
  if (user.user["techStack"] !== null) {
    tech_stack_default = user.user.techStack.split(",");
  } else tech_stack_default = null;

  return (
    <>
      {contextHolder}
      <Title level={3}>Настройки аккаунта {user.id}</Title>
      <Row gutter={[10, 10]}>
        <Col xs={24} xl={12}>
          <Card title={"Социальные ссылки"} style={{ height: "100%" }}>
            <Form
              name="social_links"
              autoComplete="off"
              onFinish={(social_links) => { API({ endpoint: "/users", method: "patch", data: { socialLinks: social_links }, message: { show: true, api: messageApi, ok: "Социальные ссылки успешно обновлены!", err: "Ошибка" } }) }}
              initialValues={{
                userGithub: user.user.userGithub,
                userTelegram: user.user.userTelegram,
                userStepik: user.user.userStepik,
                userKaggle: user.user.userKaggle,
                userWebsite: user.user.userWebsite,
              }}
            >
              <Form.Item name="userGithub">
                <Input
                  addonBefore={<GithubOutlined />}
                  placeholder="github username"
                />
              </Form.Item>

              <Form.Item name="userTelegram">
                <Input
                  addonBefore={
                    <Image src={Telegram_logo} width={17} preview={false} />
                  }
                  placeholder="telegram username"
                />
              </Form.Item>

              <Form.Item name="userStepik">
                <Input
                  addonBefore={
                    <Image src={Stepik_logo} width={17} preview={false} />
                  }
                  placeholder="stepik id"
                />
              </Form.Item>

              <Form.Item name="userKaggle">
                <Input
                  addonBefore={
                    <Image src={Kaggle_logo} width={17} preview={false} />
                  }
                  placeholder="kaggle username"
                />
              </Form.Item>

              <Form.Item name="userWebsite">
                <Input addonBefore={<GlobalOutlined />} placeholder="website" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Обновить
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card title={"Вход и безопасность"} style={{ height: "100%" }}>
            <Form
              name="password_change"
              autoComplete="off"
              onFinish={(password) => { API({ endpoint: "/users/", method: "patch", data: { password: password }, message: { show: true, api: messageApi, ok: "Пароль обновлён", err: "Ошибка" } }); }}
            >
              <Form.Item name="currentPassword">
                <Input.Password
                  addonBefore={<LockOutlined />}
                  placeholder="Текущий пароль"
                  rules={[
                    {
                      required: true,
                      message: 'Введите текущий пароль!',
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item name="newPassword">
                <Input.Password
                  addonBefore={<LockOutlined />}
                  placeholder="Новый пароль"
                  rules={[
                    {
                      required: true,
                      message: 'Введите новый пароль!',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="confirmPassword">
                <Input.Password
                  addonBefore={<LockOutlined />}
                  placeholder="Новый пароль ещё раз"
                  rules={[
                    {
                      required: true,
                      message: 'Подтвердите свой новый пароль!',
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Изменить пароль
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card title={"Основная информация"} style={{ height: "100%" }}>
            <Form
              name="baseInfo"
              initialValues={{
                aboutText: user.user.userAboutText
              }}
              autoComplete="off"
              layout="vertical"
              onFinish={(aboutText) => {
                API({
                  endpoint: "/users", method: "patch", data: { aboutText: aboutText.aboutText },
                  message: { show: true, api: messageApi, ok: "Описание профиля успешно обновлено!", err: "Ошибка при обновлении описания профиля" }
                });
              }}
            >
              <Form.Item name="aboutText" label="О себе">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Input
                    addonBefore={<InfoCircleOutlined />}
                    defaultValue={user.user.userAboutText}
                    placeholder="Краткая информация о вас"
                  />
                </Space>
              </Form.Item>

              <Form.Item name="avatar" label="Аватар">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Upload
                    name="file"
                    accept=".png,.jpg,.gif,.jpeg"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    method="PATCH"
                    action={`${API_URL}/users/avatar`}
                    headers={
                      {
                        authorization: `Bearer ${localStorage.getItem("user")}`,
                      }
                    }
                    onChange={(info) => {
                      if (info.file.status !== 'uploading') {
                        //console.log(info.file, info.fileList);
                      }
                      if (info.file.status === 'done') {
                        messageApi.success("Аватар обновлён");
                        setAvatarImageUrl(`${STORAGE}/avatars/${info.file.response.avatar}?nocache=${Date.now()}`);

                      } else if (info.file.status === 'error') {
                        messageApi.error("Ошибка при загрузке файла");
                      }
                    }}
                  >
                    <Image
                      src={avatarImageUrl}
                      preview={false}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }} />
                  </Upload>
                </Space>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Обновить
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card title={"Дополнительно"} style={{ height: "100%" }}>
            <Form
              name="extra"
              initialValues={{ techStack: tech_stack_default }}
              autoComplete="off"
              layout="vertical"
              onFinish={(new_tech_stack) => { API({ endpoint: "/users", method: "patch", data: new_tech_stack, message: { show: true, api: messageApi, ok: "Стэк технологий успешно обновлён!", err: "Ошибка" } }); }}
            >
              <Form.Item name="techStack" label="Технологии">
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                  }}
                  tokenSeparators={[","]}
                  options={defaultStackExamples}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Обновить
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Settings;
