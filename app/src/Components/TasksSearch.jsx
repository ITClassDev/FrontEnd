import React, { useState } from "react";
import { Select } from "antd";
import { API } from "../api";


const TasksSearch = ({ placeholder, style, taskSearchSelect, callback }) => {
    const fetch = (value, callback) => {
        API({
            endpoint: `/assigments/tasks/search?query=${value}`, ok: (resp) => {
                callback(resp.data.map(task => ({
                    value: task.title,
                    label: task.uuid
                })))
            }
        })
    };

    const [data, setData] = useState([]);
    const handleSearch = (newValue) => {
        if (newValue) {
            fetch(newValue, setData);
        } else {
            setData([]);
        }
    };
    const handleChange = (newValue) => {
        callback(newValue, data.filter(option => option.value == newValue)[0].label);
    };
    return (
        <Select
            showSearch
            value={taskSearchSelect}
            placeholder={placeholder}
            style={style}
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={<>Ничего не найдено</>}
            options={(data || []).map((d) => ({
                value: d.value,
                label: d.text,
            }))}
        />
    );
};

export default TasksSearch