import React, { useEffect, useState } from "react";
import { Card, Table, Button } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  a11yLight,
  a11yDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Tabs } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { getSubmissionDetails } from "../api";

const Expanded = ({ columns, submission }) => {
  const [sourceCode, SetSourceCode] = useState("Loading...");
  const [testsRes, SetTestsRes] = useState();
  useEffect(() => {
    getSubmissionDetails(
      submission.id,
      (response) => {
        SetSourceCode(response.data.source);
        let res = [];
        response.data.task.tests_results.forEach((element, ind) => {
          res.push({key: ind, id: ind, status: element.status ? "ОК" : "ERROR", time: element.duration, memory: 122, stdout: element.error_info});
        });
        SetTestsRes(res);
      },
      (response) => {}
    );
  }, []);
  return (
    <>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Исходный код" key="1">
          <SyntaxHighlighter
            language="cpp"
            style={a11yDark}
            showLineNumbers
          >
            {sourceCode}
          </SyntaxHighlighter>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Тесты" key="2">
          <Table columns={columns} dataSource={testsRes}/>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
const MyAttempts = ({ attempts, getSubmissions }) => {
  const loadSubmissionDetails = (resp) => {
    console.log(resp);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Дата", dataIndex: "date", key: "date" },
    { title: "Язык", dataIndex: "lang", key: "lang" },
    { title: "Статус", dataIndex: "status", key: "status" },
    { title: "Тесты", dataIndex: "tests", key: "tests" },
  ];
  const columns_tests = [
    { title: "Тест", dataIndex: "id", key: "id" },
    { title: "Вердикт", dataIndex: "status", key: "status" },
    { title: "Время работы", dataIndex: "time", key: "time" },
    { title: "Используемая память (байт)", dataIndex: "memory", key: "memory" },
    { title: "STDOUT", dataIndex: "stdout", key: "stdout" },
  ];
  return (
    <Card title="Ваши посылки">
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
            return <Expanded columns={columns_tests} submission={record} />;
          },
          rowExpandable: (record) => true,
        }}
      />
    </Card>
  );
};
export default MyAttempts;
