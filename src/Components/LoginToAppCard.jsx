import React from "react";
import { Alert, Card, Button } from "antd";

const LoginTo = ({ appTitle, approve_handler }) => {
  return (
    <Card bordered={false} title={`Войти в ${appTitle}`}>
      <Alert
        message={`Нажимая на кнопку "продолжить", вы передаёте доступ приложению "${appTitle}" к вашей общей информации. Помните, что администрация ШТП не мониторит каждое приложение. Приложение проверяется только при певой верификации! Если ваш аккаунт взломают(что не возможно, так как у oauth токенов нет доступа к данным аккаунта), то вы сами виноваты!`}
        type="warning"
        style={{ marginBottom: 20 }}
      />
      <Button
        type="primary"
        style={{ marginRight: 15 }}
        onClick={approve_handler}
      >
        Разрешить
      </Button>
      <Button>Отмена</Button>
    </Card>
  );
};

export default LoginTo;
