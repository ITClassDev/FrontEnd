import Achivment from "./Achivment";
import { Row } from "antd";

const AchivmentsList = ({ achivments }) => {
  return (
    <Row>
      {achivments.map((achive, ind) => (
        <Achivment
          title={achive.title}
          desc={achive.description}
          points={achive.points}
          date={achive.received_at}
          key={achive.id}
        />
      ))}
    </Row>
  );
};

export default AchivmentsList;
