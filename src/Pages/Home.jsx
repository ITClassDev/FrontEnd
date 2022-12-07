import React, { useState, useEffect } from "react";
import { userHook } from "../api";
import IntroPage from "../Components/IntroPage";

import ProfileCard from "../Components/ProfileCard.jsx";

const Home = ({ user }) => {
  useEffect(() => {
    userHook(() => {
      //fillProfile(setUserAbout, setUserName, setUserAvatar, user.user);
      setPage(<ProfileCard user={user.user}/>);
    }, () => { setPage(<IntroPage/>) }, user)
  }, [user]);
  const [page, setPage] = useState(<>Loading...</>);

  return (page);


}

export default Home;