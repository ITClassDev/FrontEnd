import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getOtherUser } from "../api";
import ProfileCard from "../Components/ProfileCard";
import NotFound from "./NotFound";

const ViewProfile = () => {
    const { user_id } = useParams();
    const [page, setPage] = useState(<>Loading...</>);
    useEffect(() => {getOtherUser((resp) => {setPage(<ProfileCard user={resp.data} header_title="Профиль пользователя"/>)}, () => {setPage(<NotFound/>)}, user_id)}, []);
    return (page);
}

export default ViewProfile;