import React, { useEffect } from "react";
import ProfileCard from "../Components/ProfileCard.jsx";
import useDocumentTitle from "../useDocumentTitle.js";

const Home = ({ user }) => {

  useDocumentTitle("ШТП | Ваш профиль");
  return <ProfileCard user={user.user} editable={true}/>;
};

export default Home;
