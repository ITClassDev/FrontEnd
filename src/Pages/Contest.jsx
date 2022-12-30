import { Menu, Tooltip, QRCode, Popover } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CodeOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import ProgTask from "../Components/ProgTask";
import { useState } from "react";
import SubmitViaGithub from "../Components/SubmitViaGithub";
import { FRONTEND_URL } from "../config";

function choosePage(setPage, item) {
  if (item === "submit") setPage(<SubmitViaGithub />);
  else
    setPage(
      <ProgTask
        title={item}
        desc="Написать функцию string itc_hello_str(string name), которая принимает имя пользователя и возвращает строку приветствие «Hello, <имя пользователя>»"
        time_limit={5}
        memory_limit={100}
        can_submit={false}
      />
    );
}

const Contest = () => {
  const [pageContent, setPageContent] = useState(<SubmitViaGithub />);
  const correctTask = (
    <Tooltip title="задача сдана">
      <CheckCircleOutlined style={{ color: "green" }} />
    </Tooltip>
  );
  const invalidTask = (
    <Tooltip title="задача не сдана">
      <CloseCircleOutlined style={{ color: "red" }} />
    </Tooltip>
  );
  const items = [
    { label: "Submit", key: "submit", icon: <CodeOutlined /> },
    { label: "itc_hello_str", key: "task-0", icon: correctTask },
    { label: "task #1", key: "task-1", icon: invalidTask },
    { label: "task #2", key: "task-2", icon: invalidTask },
  ];

  return (
    <>
      <h1>
        Контест - STR EASY{" "}
        <Popover
          overlayInnerStyle={{
            padding: 0,
          }}
          content={<QRCode value={`${FRONTEND_URL}/12`} bordered={false} />}
        >
          <QrcodeOutlined/>
        </Popover>
      </h1>
      <Menu
        items={items}
        mode="horizontal"
        defaultSelectedKeys={["submit"]}
        style={{ borderRadius: 10, marginBottom: 20 }}
        onClick={(item) => {
          choosePage(setPageContent, item.key);
        }}
      />
      {pageContent}
    </>
  );
  /* <ProgTask title="itc_hello_str" desc="Написать функцию string itc_hello_str(string name), которая принимает имя пользователя и возвращает строку приветствие «Hello, <имя пользователя>»" time_limit={5} memory_limit={100} can_submit={false}/> */
};

export default Contest;
