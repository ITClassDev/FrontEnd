import React from "react";
import { Alert, Card } from 'antd';

const Home = () => {
  return (
    <>
       <Card title="Card title" bordered={false}>
          Card content
        </Card>
      <Alert message="Вас забанил Путинцев" type="error" />
    </>

  )
}

export default Home;