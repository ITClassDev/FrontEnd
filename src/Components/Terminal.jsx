import React from "react";
import Typography from "antd/es/typography/Typography";

const { Text } = Typography;

const Terminal = () => {
    return (
        <>
            <div>
                <li><Text style={{color: "#1793d1"}} strong>ret7020</Text>@<Text style={{color: "#1793d1"}} strong>1561</Text></li>
                <li><Text style={{color: "#1793d1"}} strong>Class</Text>: 10</li>
                <li><Text style={{color: "#1793d1"}} strong>Rating</Text>: 150</li>
            </div>
        </>
    )
}

export default Terminal;