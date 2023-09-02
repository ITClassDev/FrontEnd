import React, { useState, useRef, useEffect } from "react";
import { Tag, Input } from "antd";
import {
    PlusOutlined,
} from "@ant-design/icons";

export const TagsArray = ({ tags, setTags, color }) => {
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);
    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);

    const handleClose = (index) => {
        const newTags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        setTags(newTags);
    };


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputConfirm = () => {
        setTags([...tags, inputValue]);
        setInputVisible(false);
        setInputValue('');
    };
    const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value);
    };
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        setEditInputIndex(-1);
        setInputValue('');
    };



    return (
        <>
            {tags.map((tag, index) => (
                <Tag key={index} color={color} onClose={() => handleClose(index)} closable>{tag}</Tag>
            ))}

            {inputVisible ? (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={{
                        width: 78,
                        verticalAlign: 'top',
                    }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag style={{ borderStyle: 'dashed' }} onClick={showInput} >
                    <PlusOutlined />
                </Tag>
            )}

        </>
    );
}