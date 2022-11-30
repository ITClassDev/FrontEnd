import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ApiDocs = () => {
    return (
        <>
            <h1>Документация для разработчиков</h1>
            <div>
                <p>
                    <b>ШТП</b> - построено на архитуктуре REST API. Т.е. у нас есть два независимых(software) сервера. Один из них отвечает за BackEnd, а другой за FrontEnd. Они работают независимо и используют разные технологии. Если интересно, то можете чекнуть нашу организацию на GitHub и поставить звёздочку.
                </p>
                <p>
                    В этой документации мы опишем процесс взаимодействия с нашим API:
                    <ul>
                        <li>Анонимные эндпоинты</li>
                        <li>Авторизация</li>
                        <li>Работа с приватными эндпоинтами</li>
                        <li>Выбор сериализации</li>
                        <li>OAuth + SSO</li>
                        <li>Наша бибилиотека для Python</li>
                        <li>Наши бэкдоры</li>
                    </ul>
                </p>
            </div>
            <h1>База</h1>
            <p>
                У нас открытый API и вы можете писать свои клиенты под него. Наполовину закрытым является часть API для получения возможности интеграции с OAuth, для этого вам нужно создать специальное "приложение", после верификации которого вы получите доступ к OAuth. Подробнее это описано в секции OAuth.
            </p>
            <p>
                <b>API URL:</b> <code>https://api.1561.ru</code><br />
                <b>Methods: </b> <code>[GET, POST]</code>
            </p>
            <h1>Анонимные эндпоинты</h1>
            <p>
                Анонимные эндпоинты - эндпоинты нашего API, который не требуют авторизацию со стороны клиента, т.е. доступ к этим эндпоинтам есть у всех. Самый простейши из таких - <code>users/info</code>.
            </p>
            <p>
                Пример использования(Python + Requests)
                <SyntaxHighlighter language="python" style={a11yLight}>
{`import requests
API_URL = "https://api.1561.ru/"
USER_ID = 1
data = requests.get(f"{API}users/{USER_ID}/info")
if data.status_code == 200:
    res_dict = data.json()
    print(res_dict)
else:
    print("Invalid status code return")
`}
                </SyntaxHighlighter>
            </p>
        </>
    );
}

export default ApiDocs;