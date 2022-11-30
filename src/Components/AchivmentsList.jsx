import Achivment from "./Achivment";
import { Col, Row } from 'antd';

const AchivmentsList = ({achivments, ...props}) => {
    return (
        <Row>
            {achivments.map(achive => <Achivment title={achive.title} desc={achive.desc} points={achive.points}/>)}
        </Row>
    );
}

export default AchivmentsList;
