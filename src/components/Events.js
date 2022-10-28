import React from "react";
import EventItem from "./EventItem";

export default function Events() {
  return (
    <>
    <h2 className="text-center" style={{marginTop: "85px"}}>All Events</h2>
      <div className="container" style={{marginTop: "30px"}}>
        <div className="row">
   <EventItem />
   <EventItem />
   <EventItem />
   <EventItem />
   <EventItem />
   <EventItem />
   <EventItem />
   </div>
      </div>
    </>
  );
}
