import { Menu, Tooltip, QRCode, Popover, Typography } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CodeOutlined,
  QrcodeOutlined,
  MinusCircleOutlined
} from "@ant-design/icons";
import ProgTask from "../Components/ProgTask";
import { useEffect, useState } from "react";
import SubmitViaGithub from "../Components/SubmitViaGithub";
import { config } from "../config";
import { useParams } from "react-router-dom";
import { API } from "../api";
import useDocumentTitle from "../useDocumentTitle";

const FRONTEND_URL = config.FRONTEND_URL;

const { Title } = Typography;

export const Contest = () => {
  const [contestTitle, SetContestTitle] = useState();
  const [contestDescription, SetContestDescription] = useState("Loading...");
  const [solvedTasks, setSolvedTasks] = useState();
  const params = useParams();

  useDocumentTitle("ШТП | Контест");

  const choosePage = (setPage, item, contest_id) => {
    if (item === "submit") setPage(<SubmitViaGithub contest_id={params.contest_id} contestDescription={contestDescription} />);
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
  const load = () => {
    API({
      endpoint: `/assigments/contest/${params.contest_id}/solved`, ok: (tasks_statuses) => {
        API({
          endpoint: `/assigments/contests/${params.contest_id}`, ok: (resp) => {
            SetContestDescription(resp.data.description)
            SetContestTitle(resp.data.title);
            SetMenuTasks([{ label: "Submit", key: "submit", icon: <CodeOutlined /> }]);
            let allTasks = resp.data.tasks;
            SetMenuTasks(prev => (prev.concat(allTasks.map((task) => ({
              key: task.uuid,
              label: task.title,
              icon: tasks_statuses.data.solved.includes(task.uuid) ? correctTask : (
                tasks_statuses.data.failed.includes(task.uuid) ? failedTask : notSentTask
              )
            })))));
          }
        })
      }
    });
  }

  useEffect(() => {
    load();
  }, []);

  const [pageContent, setPageContent] = useState(
    <SubmitViaGithub contest_id={params.contest_id} contestDescription={contestDescription} />
  );
  const correctTask = (
    <Tooltip title="Задача сдана">
      <CheckCircleOutlined style={{ color: "green" }} />
    </Tooltip>
  );
  const failedTask = (
    <Tooltip title="Задача решена неверно">
      <CloseCircleOutlined style={{ color: "red" }} />
    </Tooltip>
  );
  const notSentTask = (
    <Tooltip title="Задачу ещё не сдавали">
      <MinusCircleOutlined style={{ color: "blue" }} />
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
          content={<QRCode value={`${FRONTEND_URL}/contests/${params.contest_id}`} bordered={false} />}
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
          load();
        }}
      />
      {pageContent}
    </>
  );
};

