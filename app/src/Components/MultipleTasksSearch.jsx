import { API } from "../api";
import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { config } from "../config";

const API_URL = config.API_URL;

function DebounceSelect({ fetchOptions, debounceTimeout = 200, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        console.log("Fetch")
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    return;
                }
                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}


async function fetchUserList(value) {
    return fetch(`${API_URL}/assigments/tasks/search?query=${value}`)
        .then((response) => response.json())
        .then((body) =>
            body.map((task) => ({
                label: task.title,
                value: task.uuid,
            }))
        );
}


const MultipleTaskSearch = ({ value, setValue }) => {
    return (
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="Поиск задач"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            style={{
                width: '100%',
            }}
        />
    );
}

export default MultipleTaskSearch;