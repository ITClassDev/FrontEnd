import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API } from "../api";
import ProfileCard from "../Components/ProfileCard";
import NotFound from "./NotFound";

const ViewProfile = () => {
  const [searchParams] = useSearchParams();
  const user_id = searchParams.get("id");
  const [page, setPage] = useState(<>Loading...</>);
  useEffect(() => {
    API ({endpoint: `/users/${user_id}`, ok: (resp) => {
      setPage(
        <ProfileCard user={resp.data} header_title="Профиль пользователя" />
      );
    }, err: () => {
        setPage(<NotFound/>);
      }}) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return page;
};

export default ViewProfile;
