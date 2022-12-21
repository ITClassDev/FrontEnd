import React from "react";
import Typography from "antd/es/typography/Typography";

const { Text } = Typography;

const Terminal = ({username, user_class, user_rating}) => {
  return (
    <>
      <div>
        <li>
          <Text style={{ color: "#1793d1" }} strong>
            {username}
          </Text>
          @
          <Text style={{ color: "#1793d1" }} strong>
            1561
          </Text>
        </li>
        <li>
          <Text style={{ color: "#1793d1" }} strong>
            Class
          </Text>
          : {user_class}
        </li>
        <li>
          <Text style={{ color: "#1793d1" }} strong>
            Rating points
          </Text>
          : {user_rating}
        </li>
      </div>
    </>
  );
};

export default Terminal;
