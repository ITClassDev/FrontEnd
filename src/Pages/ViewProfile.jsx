import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { getOtherUser } from "../api";
import ProfileCard from "../Components/ProfileCard";
import NotFound from "./NotFound";

const ViewProfile = () => {
    const [searchParams] = useSearchParams();
    const user_id = searchParams.get("id");
    const [page, setPage] = useState(<>Loading...</>);
    useEffect(() => {getOtherUser((resp) => {setPage(<ProfileCard user={resp.data} header_title="Профиль пользователя"/>)}, () => {setPage(<NotFound/>)}, user_id)}, []);
    return (page);
}

export default ViewProfile;