import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { getActiveEvents } from "../profil_mos_api";
import EventCard from "./EventCard";
import { LoadingBig } from "./Loading";

const StudyEvents = () => {
  const [events, setEvents] = useState(<LoadingBig/>);
  useEffect(() => {
    getActiveEvents((response) => {
      setEvents(
        <>
          {response.data.data.eventsList.events.map((event) => (
            <EventCard
              key={event.id}
              event_id={event.id}
              title={event.title}
              organizer={event.agent.name}
              audience={event.audiencesShort[0]}
              seats_available={`${event.emptySeats + event.emptySeatsOnline}/${event.seats + event.seatsOnline}`}
              event_date={event.startTime}
              start_time={event.startTime}
              finish_time={event.finishedTime}
            />
          ))}
        </>
      );
    });
  }, []);
  return <Row>{events}</Row>;
};

export default StudyEvents;