import React, { useContext, useEffect, useState } from "react";
import ProfileCard from "../Components/ProfileCard.jsx";
import useDocumentTitle from "../useDocumentTitle.js";
import userContext from "../Contexts/user.js";
import { API } from "../api.js";

export const Home = () => {
  useDocumentTitle("ШТП | Ваш профиль");
  const { userInfo, setUser, loading } = useContext(userContext);
  const [localLoading, setlocalLoading] = useState(true); // Prevent old data loading; lock current state
  useEffect(() => {

    API({
      endpoint: '/auth/me/', ok: (response) => {
        setUser({ userInfo: response.data.user, loggedIn: true, loading: false });
        setlocalLoading(false);
      }
    });
  }, []);
  if (localLoading) return <>Loading...</>;
  else return <ProfileCard editable={true} userInfo={userInfo} />;
};

