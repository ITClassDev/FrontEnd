import { Menu, Tooltip, QRCode, Popover, Typography } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CodeOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import ProgTask from "../Components/ProgTask";
import { useEffect, useState } from "react";
import SubmitViaGithub from "../Components/SubmitViaGithub";
import { FRONTEND_URL } from "../config";
import { useSearchParams } from "react-router-dom";
import { getContestData, getTaskData } from "../api";

const { Title } = Typography;

function choosePage(setPage, item, contest_id) {
  if (item === "submit") setPage(<SubmitViaGithub />);
  else {
    getTaskData(
      item,
      (response) => {
        setPage(
          <ProgTask
            title={response.data.title}
            desc={response.data.text}
            time_limit={response.data.time_limit}
            memory_limit={response.data.memory_limit}
            can_submit={false}
            task_id={response.data.id}
            tests={response.data.tests}
            contest_id={contest_id}
          />
        );
      },
      () => {}
    );
  }
}

const Contest = () => {
  const [contestTitle, SetContestTitle] = useState();
  const [searchParams] = useSearchParams();
  const contest_id = searchParams.get("id");
  useEffect(() => {
    getContestData(
      contest_id,
      (response) => {
        SetContestTitle(response.data.title);
        let result = [];
        response.data.tasks_ids_list.forEach((task) => {
          result.push({ key: task, label: task, icon: correctTask });
        });
        SetMenuTasks([
          { label: "Submit", key: "submit", icon: <CodeOutlined /> },
          ...result,
        ]);
      },
      (response) => {}
    );
  }, []);
  
  const [pageContent, setPageContent] = useState(<SubmitViaGithub  contest_id={searchParams.get("id")}/>);
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
  const [menuTasks, SetMenuTasks] = useState([
    { label: "Submit", key: "submit", icon: <CodeOutlined /> },
  ]);

  return (
    <>
      <Title level={3}>
        Контест - {contestTitle}{" "}
        <Popover
          overlayInnerStyle={{
            padding: 0,
          }}
          content={<QRCode value={`${FRONTEND_URL}?id=3`} bordered={false} />}
        >
          <QrcodeOutlined />
        </Popover>
      </Title>
      <Menu
        items={menuTasks}
        mode="horizontal"
        defaultSelectedKeys={["submit"]}
        style={{ borderRadius: 10, marginBottom: 20 }}
        onClick={(item) => {
          choosePage(setPageContent, item.key, contest_id);
        }}
      />
      {pageContent}
    </>
  );
};

export default Contest;
