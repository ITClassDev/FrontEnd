import Achivment from "./Achivment";
import { Row } from "antd";

const AchivmentsList = ({ achivments }) => {
  if (achivments.length > 0) {
    return (
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
    );
  } else {
    return "Здесь пока нет одобренных достижений.";
  }

};

export default AchivmentsList;
