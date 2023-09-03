import Achivment from "./Achivment";
import { Button, Row } from "antd";
import { DownloadPrivateFile } from "../api";

const AchivmentsList = ({ achivments }) => {
  if (achivments.length > 0) {
    return (
      <>
        <Button style={{ marginBottom: 20 }} onClick={() => {
          DownloadPrivateFile({endpoint: "/achievements/export", file_name: "achievements_dump.zip"});
        }}>Экспортировать</Button>
        <Row>
          {achivments.map((achive, ind) => (
            <Achivment
              title={achive.title}
              desc={achive.description}
              points={achive.points}
              date={achive.created_at}
              key={achive.id}
            />
          ))}
        </Row>
      </>
    );
  } else {
    return "Здесь пока нет одобренных достижений.";
  }

};

export default AchivmentsList;
