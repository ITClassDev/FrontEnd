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
import { updateSocialLinks } from "../api";

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
  const updateSocialLinksFormHandler = (social_links) => {
    updateSocialLinks(
      social_links,
      (response) => {
        messageApi.open({
          type: "success",
          content: "Социальные ссылки успешно обновлены!",
        });
      },
      (response) => {
        messageApi.open({
          type: "error",
          content: "Ошибка!",
        });
      }
    );
  };
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
              onFinish={updateSocialLinksFormHandler}
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
            >
              <Form.Item name="current_password">
                <Input
                  addonBefore={<LockOutlined />}
                  placeholder="Текущий пароль"
                />
              </Form.Item>

              <Form.Item name="new_password">
                <Input
                  addonBefore={<LockOutlined />}
                  placeholder="Новый пароль"
                />
              </Form.Item>
              <Form.Item name="confirm_password">
                <Input
                  addonBefore={<LockOutlined />}
                  placeholder="Новый пароль ещё раз"
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
            >
              <Form.Item name="about">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text strong>Bio</Text>
                  <Input
                    defaultValue={user.user.userAboutText}
                    addonBefore={<InfoCircleOutlined />}
                    placeholder="Краткая информация о вас"
                  />
                </Space>
              </Form.Item>

              <Form.Item name="avatar">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text strong>Аватар</Text>
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
