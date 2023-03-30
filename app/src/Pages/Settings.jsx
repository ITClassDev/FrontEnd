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
import React from "react";
import Telegram_logo from "../Images/Telegram_logo.svg";
import Stepik_logo from "../Images/Stepik_logo.png";
import Kaggle_logo from "../Images/Kaggle_logo.svg";
import {
  GithubOutlined,
  LockOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { STORAGE } from "../config";
import { API } from "../api";

// FIXIT; for dev purpose
window.API = API;

const { Title, Text } = Typography;

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
              onFinish={(social_links) => { API({endpoint: "/users/update/social", method: "patch", data: social_links, message: { show: true, api: messageApi, ok: "Социальные ссылки успешно обновлены!", err: "Ошибка" }}) }}
              initialValues={{
                github: user.user.userGithub,
                telegram: user.user.userTelegram,
                stepik: user.user.userStepik,
                kaggle: user.user.userKaggle,
                website: user.user.userWebsite,
              }}
            >
              <Form.Item name="github">
                <Input
                  addonBefore={<GithubOutlined />}
                  placeholder="github username"
                />
              </Form.Item>

              <Form.Item name="telegram">
                <Input
                  addonBefore={
                    <Image src={Telegram_logo} width={17} preview={false} />
                  }
                  placeholder="telegram username"
                />
              </Form.Item>

              <Form.Item name="stepik">
                <Input
                  addonBefore={
                    <Image src={Stepik_logo} width={17} preview={false} />
                  }
                  placeholder="stepik id"
                />
              </Form.Item>

              <Form.Item name="kaggle">
                <Input
                  addonBefore={
                    <Image src={Kaggle_logo} width={17} preview={false} />
                  }
                  placeholder="kaggle username"
                />
              </Form.Item>

              <Form.Item name="website">
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
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              onFinish={(password) => { API({ endpoint: "/users/update/password", method: "patch", data: password, message: { show: true, api: messageApi, ok: "Пароль обновлён", err: "Ошибка" } }); }}
            >
              <Form.Item name="current_password">
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

              <Form.Item name="new_password">
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
              <Form.Item name="confirm_password">
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
              name="password_change"
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item name="about" label="О себе">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Input
                    defaultValue={user.user.userAboutText}
                    addonBefore={<InfoCircleOutlined />}
                    placeholder="Краткая информация о вас"
                  />
                </Space>
              </Form.Item>

              <Form.Item name="avatar" label="Аватар">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  >
                    <img
                      src={`${STORAGE}/avatars/${user.user.userAvatarPath}`}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                    />
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
              initialValues={{ tech_stack: tech_stack_default }}
              autoComplete="off"
              layout="vertical"
              onFinish={(new_tech_stack) => { API({ endpoint: "/users/update/tech_stack", method: "patch", data: new_tech_stack, message: { show: true, api: messageApi, ok: "Стэк технологий успешно обновлён!", err: "Ошибка" } }); }}
            >
              <Form.Item name="tech_stack" label="Технологии">
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
