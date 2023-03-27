import Achivment from "./Achivment";
import { Row } from "antd";

const AchivmentsList = ({ achivments }) => {
  if (achivments.length > 0){
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
  }else{
    return "У вас пока нет добавленных достижений";
  }
  
};

export default AchivmentsList;
