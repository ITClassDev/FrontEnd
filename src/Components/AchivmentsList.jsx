import Achivment from "./Achivment";
import { Row } from 'antd';

const AchivmentsList = ({achivments}) => {
    return (
        <Row>
            {achivments.map((achive, ind) => <Achivment title={achive.title} desc={achive.desc} points={achive.points} key={ind}/>)}
        </Row>
    );
}

export default AchivmentsList;
