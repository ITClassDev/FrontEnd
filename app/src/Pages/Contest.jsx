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
import { config } from "../config";
import { useParams } from "react-router-dom";
import { getContestData, getTaskData, API } from "../api";
import useDocumentTitle from "../useDocumentTitle";

const FRONTEND_URL = config.FRONTEND_URL;

const { Title } = Typography;

export const Contest = () => {
  const [contestTitle, SetContestTitle] = useState();
  const [contestDescription, SetContestDescription] = useState("Loading...");
  const params = useParams();

  function choosePage(setPage, item, contest_id) {
    if (item === "submit") setPage(<SubmitViaGithub contest_id={params.contest_id} contestDescription={contestDescription}/>);
    else {
      API({
        endpoint: `/assigments/tasks/${item}`, ok: (resp) => {
          setPage(
            <ProgTask
              key={resp.data.uuid}
              title={resp.data.title}
              desc={resp.data.text}
              time_limit={resp.data.timeLimit}
              memory_limit={resp.data.memoryLimit}
              can_submit={false}
              task_id={resp.data.uuid}
              tests={resp.data.tests}
              contest_id={params.contest_id}
            />
          );
        }
      })
    }
  }
  useDocumentTitle("ШТП | Контест");

  useEffect(() => {
    API({
      endpoint: `/assigments/contests/${params.contest_id}`, ok: (resp) => {
        SetContestDescription(resp.data.description)
        SetContestTitle(resp.data.title);
        SetMenuTasks([{ label: "Submit", key: "submit", icon: <CodeOutlined /> }]);
        SetMenuTasks(prev => (prev.concat(resp.data.tasks.map((task) => ({
          key: task.uuid,
          label: task.title,
          icon: invalidTask
        })))));

      }
    })
  }, []);

  const [pageContent, setPageContent] = useState(
    <SubmitViaGithub contest_id={params.contest_id} contestDescription={contestDescription} />
  );
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
          choosePage(setPageContent, item.key, params.contest_id);
        }}
      />
      {pageContent}
    </>
  );
};

