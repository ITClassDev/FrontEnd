import React from "react";
import { GithubOutlined } from '@ant-design/icons';
import { Card, Form, Input, Button, Alert, Space, Typography } from 'antd';
const { Text, Link } = Typography;

const SubmitViaGithub = () => {
    return (
        <Card title={<><GithubOutlined /> Сдать через GitHub</>} style={{ marginBottom: 20 }}>
            <Alert style={{marginBottom: 20}}
                showIcon
                message="Убедитесь, что:"
                description=<Space direction="vertical">Файлы для задач должны быть в корне репозитория. Репозиторий дожен быть открытым</Space>
                type="info"
            />
            <Form
                name="basic"
                autoComplete="off"
            >
                <Form.Item
                    label="Link to repo"
                    name="github_repo"
                    rules={[
                        {
                            required: true,
                            message: 'Link to GitHub repo',
                        },
                    ]}>
                    <Input placeholder="https://github.com/username/repo" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default SubmitViaGithub;