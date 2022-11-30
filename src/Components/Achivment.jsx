import Card from "antd/es/card/Card";
import {StarFilled} from '@ant-design/icons';

const Achivment = ({title, points, desc, ...props}) => {
    return (
        <Card title={title} bordered={false} style={{ width: 300 }}>
            {desc}
            <hr/>
            {points} <StarFilled/>
        </Card>
    );
}

export default Achivment;