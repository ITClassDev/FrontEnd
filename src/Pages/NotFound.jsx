import { Button, Result } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Страница не найдена."
      extra={
        <Button type="primary" href="/" icon={<HomeOutlined/>}>
          На главную
        </Button>
      }
    />
  );
};

export default NotFound;
