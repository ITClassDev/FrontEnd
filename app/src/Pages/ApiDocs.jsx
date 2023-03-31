import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { users_info_base } from "../code_snippets";
import API_URL from "../config";
import { Typography, Space, Image } from 'antd';
const { Title, Text, Paragraph } = Typography;


const ApiDocs = () => {
    return (
        <>
            <Title level={3}>Документация для разработчиков</Title>
            <Space direction="vertical">
                <Paragraph>
                    <Text strong>ШТП</Text><Text> построено на архитуктуре RESTful API. Для работы <Text strong>ШТП</Text> используется два независимых(software) сервера(физически один). Один из них отвечает за Backend, а другой за Frontend. Сервера работают независимо и используют разные технологии. Кроме того, локально запущен tcp сервер сервиса для <Text strong>ShTPChecker</Text> - системы автоматизированной проверки задач по программированию в изолированной среде.</Text>
                </Paragraph>
                <Paragraph>
                    <Text>В документации вы найдёте:</Text>
                    <ul>
                        <li>Работа с анонимными эндпоинтами</li>
                        <li>Авторизация и приватные эндпоинты</li>
                        <li>Выбор protobuf/json api сериализации</li>
                        <li>ShTP OAuth</li>
                        <li>Враппер над ShTP API для Python</li>
                    </ul>
                </Paragraph>
                <Title level={4}>Основная информация</Title>

                <Paragraph>
                    <Space direction="vertical">
                        <Text strong>API: <Text code>{API_URL}</Text></Text>
                        <Text strong>Методы: <Text code>{"[GET, POST, PUT, PATCH]"}</Text></Text>
                        <Text strong>HTTP коды: </Text>
                        <ul>
                            <li><Text code type="success">200</Text> - OK</li>
                            <li><Text code type="warning">400</Text> - Ошибка при обработке данных запроса</li>
                            <li><Text code type="danger">422</Text> - Ошибка при валидации данных запроса</li>
                        </ul>
                    </Space>
                </Paragraph>
                <Title level={4}>Анонимные эндпоиниты</Title>
                <Paragraph>
                    Анонимные эндпоинты - эндпоинты ShTP API, которые не требуют авторизацию со стороны клиента, то есть доступ к этим эндпоинтам есть у всех. Самый простейший из таких - <Text code>users/info</Text>.
                </Paragraph>
                <Paragraph>
                    Пример использования(Python + requests)
                    <SyntaxHighlighter language="python" style={a11yDark}>{users_info_base}</SyntaxHighlighter>
                </Paragraph>

                <Title level={4}>Авторизация</Title>
                <Paragraph>
                    Авторизация работает на простейшей схеме JWT токенов. Backend генерирует токен, который экспайрится через 1440 минут (24 часа). Refresh токены пока не реализованы
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
                    <Image src="https://i.imgur.com/8hBttWR_d.webp?maxwidth=760&fidelity=grand" />
                </Paragraph>
                <Paragraph>

                </Paragraph>
            </Space>
        </>
    );
}

export default ApiDocs;