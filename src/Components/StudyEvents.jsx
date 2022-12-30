import React, { useEffect, useState } from "react";
import { getActiveEvents } from "../profil_mos_api";

const StudyEvents = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getActiveEvents((response) => {
        
    });
  }, []);
  return (
    <>
        AAA
    </>
  )
};

export default StudyEvents;