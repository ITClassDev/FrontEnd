import React from "react";

const userContext = React.createContext({ 
    userInfo: null,
    loading: true,
    loggedIn: false,
    newNotifications: false,
    setUser: () => {} 

 });

export default userContext;