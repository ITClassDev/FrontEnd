import React, { useEffect, useState } from "react";
import { Card, Table, Button, Typography } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  a11yLight,
  a11yDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Tabs } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { API, convertDateAndTime } from "../api";

const { Text } = Typography;

const Expanded = ({ columns, submission }) => {
  const [sourceCode, SetSourceCode] = useState("Loading...");
  const [testsRes, SetTestsRes] = useState();
  useEffect(() => {
    API({endpoint: `/assigments/tasks/submit/${submission.id}`, ok: (resp) => {
      console.log(resp.data);
      SetSourceCode(resp.data.source);
      SetTestsRes(resp.data.testsResults);
    }})
    // getSubmissionDetails(
    //   submission.id,
    //   (response) => {
    //     SetSourceCode(response.data.source);
    //     let res = [];
    //     response.data.task.tests_results.forEach((element, ind) => {
    //       res.push({ key: ind, id: ind, status: element.status ? "ОК" : "ERROR", time: element.duration, memory: 122, stdout: element.error_info });
    //     });
    //     SetTestsRes(res);
    //   },
    //   (response) => { }
    // );
  }, []);
  const tabsItems = [
    {
      key: "source_code",
      label: "Исходный код",
      children: (
        <SyntaxHighlighter
          language="cpp"
          style={a11yDark}
          showLineNumbers
          lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
          wrapLines={true} 
        >
          {sourceCode}
        </SyntaxHighlighter>
      )
    },
    {
      key: "tests",
      label: "Тесты",
      children: <Table columns={columns} dataSource={testsRes} />
    }
  ]
  return (
    <>
      <Tabs defaultActiveKey="source_code" items={tabsItems}>
      </Tabs>
    </>
  );
};
const MyAttempts = ({ attempts, getSubmissions }) => {
  const [expandedSubmitId, setExpandedSubmitId] = useState();
  const loadSubmissionDetails = (resp) => {
    console.log(resp);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Дата", dataIndex: "date", key: "date", render: (_, record) => (
        convertDateAndTime(record.date)
      )
    },
    { title: "Язык", dataIndex: "lang", key: "lang" },
    {
      title: "Статус", dataIndex: "status", key: "status", render: (_, record) => (
        record.solved ? (
          <Text code type="success">
            OK
          </Text>
        ) : record.status === 2 ? (
          <Text code type="danger">
            NO
          </Text>
        ) : (
          <Text code type="warning">
            Checking...
          </Text>
        )
      )
    },
    { title: "Тесты", dataIndex: "tests", key: "tests" },
  ];
  const columns_tests = [
    { title: "Вердикт", dataIndex: "status", key: "status", render: (_, record) => (
      record.status ? <Text type="success">OK</Text> : (record.timeout ? <Text type="danger">TL</Text> : (record.memoryout ? <Text type="error">ME</Text> : <Text type="danger">RE</Text>))
    ) },
    { title: "Время работы", dataIndex: "duration", key: "duration" },
    // { title: "Используемая память (байт)", dataIndex: "memory", key: "memory" },
    { title: "StdErr", dataIndex: "error_info", key: "error_info" },
  ];
  return (
    <Card title="Ваши посылки" style={{ marginBottom: 20 }}>
      <Button
        icon={<UndoOutlined />}
        style={{ marginBottom: 20 }}
        type="primary"
        onClick={getSubmissions}
      >
        Обновить
      </Button>
      <Table
        columns={columns}
        dataSource={attempts}
        expandable={{
          expandedRowRender: (record) => {
            return <Expanded columns={columns_tests} submission={record}  />;
          },
          rowExpandable: (record) => (true),
          onExpand: (status, record) => {
            // if (status == true);
          }
        }}
      />
    </Card>
  );
};
export default MyAttempts;
