import React from "react";
import ProfileCard from "../Components/ProfileCard.jsx";

const Home = ({ user }) => {
  return <ProfileCard user={user.user} />;
};

export default Home;
