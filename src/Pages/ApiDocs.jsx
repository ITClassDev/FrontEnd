import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { users_info_base } from "../code_snippets";
import API_URL from "../config";
import { Typography, Space } from 'antd';
const { Title, Text, Paragraph } = Typography;


const ApiDocs = () => {
    return (
        <>
            <h1>Документация для разработчиков</h1>
            <Space direction="vertical">
                <Paragraph>
                    <Text strong>ШТП</Text><Text> - построено на архитуктуре REST API. Т.е. у нас есть два независимых(software) сервера. Один из них отвечает за BackEnd, а другой за FrontEnd. Они работают независимо и используют разные технологии. Если интересно, то можете чекнуть нашу организацию на GitHub и поставить звёздочку.</Text>
                </Paragraph>
                <Paragraph>
                    <Text>В этой документации мы опишем процесс взаимодействия с нашим API:</Text>
                    <ul>
                        <li>Анонимные эндпоинты</li>
                        <li>Авторизация</li>
                        <li>Работа с приватными эндпоинтами</li>
                        <li>Выбор сериализации</li>
                        <li>OAuth + SSO</li>
                        <li>Наша библиотека для Python</li>
                        <li>Наши бэкдоры</li>
                    </ul>
                </Paragraph>
                <Title level={4}>База</Title>
                <Paragraph>
                    У нас открытый API и вы можете писать свои клиенты под него. Наполовину закрытым является часть API для получения возможности интеграции с OAuth, для этого вам нужно создать специальное "приложение", после верификации которого вы получите доступ к OAuth. Подробнее это описано в секции OAuth.
                </Paragraph>
                <Paragraph>
                    <Space direction="vertical">
                        <Text strong>API URL: <Text code>{API_URL}</Text></Text>
                        <Text strong>Methods: <Text code>{"[GET, POST]"}</Text></Text>
                    </Space>
                </Paragraph>
                <Title level={4}>Анонимные эндпоиниты</Title>
                <Paragraph>
                    Анонимные эндпоинты - эндпоинты нашего API, который не требуют авторизацию со стороны клиента, т.е. доступ к этим эндпоинтам есть у всех. Самый простейший из таких - <Text code>users/info</Text>.
                </Paragraph>
                <Paragraph>
                    Пример использования(Python + Requests)
                    <SyntaxHighlighter language="python" style={a11yLight}>{users_info_base}</SyntaxHighlighter>
                </Paragraph>
                <Title level={4}>OAuth</Title>
                <Paragraph>
                    Для развития экосистемы школьных сервисов было решено создать ключевую систему аутентификации. В качестве этой системы выступает ШТП. Идея простая: у ученика есть один аккаунт на ШТП и на остальные сервисы развиваемые школой имеют возможность аутентификации через аккаунт ШТП.
                </Paragraph>
                <Paragraph>
                    <Text>Преимущества такого подхода очевидны:</Text>
                    <ul>
                        <li>Возможность синхронизации данных учеников между платформами</li>
                        <li>Один аккаунт для всех сервисов</li>
                    </ul>
                </Paragraph>

                <Paragraph>
                    Мы реализовали систему подобную OAuth. На следующем изображении показана схема аутентификации через ШТП на кастомном ресурсе.
                </Paragraph>
            </Space>
        </>
    );
}

export default ApiDocs;