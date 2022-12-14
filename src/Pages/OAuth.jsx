import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppInfo, provideAccessToApp } from "../api";
import LoginTo from "../Components/LoginToAppCard";
import NotFound from "./NotFound";

const OAuth = () => {
    const { app_id } = useParams();
    const [pageContent, setPageContent] = useState("Loading...");
    useEffect(() => {
        getAppInfo(app_id, (response) => {
            if (response.data.status) {
                setPageContent(<LoginTo appTitle={response.data.app_info.name} approve_handler={provideInfoButtonHandler}/>);
            } else {
                setPageContent(<NotFound/>)
            }

        }, () => { })
    }, []);

    function provideInfoButtonHandler(event) {
        provideAccessToApp(app_id, (response) => {
            window.location.assign(response.data.redirect_to);
        }, () => { });
    }

    return (pageContent);
}

export default OAuth;