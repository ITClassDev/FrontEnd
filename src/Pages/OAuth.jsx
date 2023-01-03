import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAppInfo, provideAccessToApp } from "../api";
import LoginTo from "../Components/LoginToAppCard";
import NotFound from "./NotFound";

const OAuth = () => {
  const [searchParams] = useSearchParams();
  const app_id = searchParams.get("app_id");
  const [pageContent, setPageContent] = useState("Loading...");
  useEffect(() => {
    getAppInfo(
      app_id,
      (response) => {
        if (response.data.verified)
          setPageContent(
            <LoginTo
              appTitle={response.data.name}
              approve_handler={provideInfoButtonHandler}
            />
          );
        else setPageContent(<NotFound />);
      },
      () => {}
    );
  }, []);

  function provideInfoButtonHandler() {
    provideAccessToApp(
      app_id,
      (response) => {
        window.location.assign(response.data.redirect_to);
      },
      () => {}
    );
  }

  return pageContent;
};

export default OAuth;
