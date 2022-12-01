import React from "react";
import { Card, Table } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const MyAttempts = () => {
    const test_source = `#include <iostream>

using namespace std;
typedef long long ll;

int main(){
    ll n, cntr = 0;
    cin >> n;
    ll arr[n];
    for (ll ind = 0; ind < n; ++ind){
        cin >> arr[ind];
    }
    for (ll ind = 1; ind < n; ind += 2){
        if (ind + 1 == n && n % 2 != 0) break;
        swap(arr[ind], arr[ind - 1]);
    }
    
    for (ll ind = 0; ind < n; ++ind){
        cout << arr[ind] << " ";
    }
}`;
    const columns = [{ title: "ID", dataIndex: "id", key: "id" }, { title: "Дата", dataIndex: "date", key: "date" }, { title: "Язык", dataIndex: "lang", key: "lang" }, { title: "Статус", dataIndex: "status", key: "status" }, { title: "Тесты", dataIndex: "tests", key: "tests" }];
    const attempts = [{ key: 1, id: "1012", date: "01.12.2022 - 19:03", lang: "GNU C++ 17", status: (<span style={{ color: "green" }}>OK</span>), tests: "10/10", source: test_source }];
    return (
        <Card title="Ваши посылки">
            <Table columns={columns} dataSource={attempts} expandable={{
                expandedRowRender: (record) => (
                    <>
                        Исходный код
                        <SyntaxHighlighter language="cpp" style={a11yLight} showLineNumbers>{record.source}</SyntaxHighlighter>
                    </>
                ),
                rowExpandable: (record) => true,
            }}
            />
        </Card>
    );
}
export default MyAttempts;