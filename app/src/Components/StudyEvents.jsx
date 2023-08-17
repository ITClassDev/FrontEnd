import { Row } from "antd";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { LoadingBar } from "./Loading";
import { API } from "../api";

const StudyEvents = () => {
  const [events, setEvents] = useState(<LoadingBar size={24} align="center" />);
  useEffect(() => {
    API({
      endpoint: '/events/profil', ok: (events) => {
        setEvents(
          <>
            {events.data.map((event) => (
              <EventCard
                key={event.id}
                event_id={event.id}
                title={event.title}
                organizer={event.organizer}
                audience={event.audience}
                seats_available={event.seatsPropotion}
                event_date={event.startTime}
                start_time={event.startTime}
                finish_time={event.finishTime}
              />
            ))}
          </>
        );
      }
    })

  }, []);
  return <Row>{events}</Row>;
};

export default StudyEvents;