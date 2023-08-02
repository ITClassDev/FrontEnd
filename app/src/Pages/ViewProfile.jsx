import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api";
import ProfileCard from "../Components/ProfileCard";
import useDocumentTitle from "../useDocumentTitle";
import { NotFound } from "./NotFound";

export const ViewProfile = () => {
  useDocumentTitle("ШТП | Профиль пользователя");
  const params = useParams()
  const [page, setPage] = useState(<>Loading...</>);
  useEffect(() => {
    API({
      endpoint: `/users/${params.user_id}`, ok: (resp) => {
        setPage(
          <ProfileCard userInfo={resp.data} header_title="Профиль пользователя" />
        );
      }, err: () => {
        setPage(<NotFound />);
      }
    })
  }, [])
  return page;
};

