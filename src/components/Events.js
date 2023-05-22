import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import EventItem from "./EventItem";
export default function Events() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filterType,setFilterType] = useState('');
  const [changeHappen,setChangeHappen] = useState(false);
  function changeType(e) {
         const selectedType = e.target.value;
         setFilterType(selectedType);
         console.log(selectedType)

  }
  function onClick() {
    navigate("/createevent");
  }
  async function updatePage() {
    console.log(localStorage.getItem('file'))
    const allEvents = JSON.parse(window.localStorage.getItem("allEvents"));
    if(!allEvents){
      return
    }
    // console.log(allEvents)
    const sortedEvents = allEvents.sort((e1, e2) =>
      moment(new Date(e1.date))
        .add(e1.startTime.split(":")[0] - 5, "h")
        .add(e1.startTime.split(":")[1], "m")
        .valueOf() >
      moment(new Date(e2.date))
        .add(e2.startTime.split(":")[0] - 5, "h")
        .add(e2.startTime.split(":")[1], "m")
        .valueOf()
        ? 1
        : moment(new Date(e1.date))
            .add(e1.startTime.split(":")[0] - 5, "h")
            .add(e1.startTime.split(":")[1], "m")
            .valueOf() <
          moment(new Date(e2.date))
            .add(e2.startTime.split(":")[0] - 5, "h")
            .add(e2.startTime.split(":")[1], "m")
            .valueOf()
        ? -1
        : 0
    );


    if(filterType !== ""){

      const filteredEvents = sortedEvents.filter((eventt)=>{
        console.log(eventt.type)
        console.log(filterType)
           return eventt.type === filterType;
      })
      console.log(filteredEvents)
      setItems(filteredEvents)
    
    }else{
      setItems(sortedEvents);
      
    }

    // const sortedEvents =
  }

  useEffect(() => {
    updatePage();
  },[filterType,changeHappen]);

  return (
    <>
      <h2 className="text-center" style={{ marginTop: "85px" }}>
        My Events
      </h2>
      <div className="container" style={{ marginTop: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <select
            className="form-select"
            aria-label="Default select example"
            value={filterType}
            id="filterType"
            name="filterType"
            // aria-label="Default select example"
            onChange={changeType}
            style={{ width: "300px" }}
          >
            {/* <option selected>Event Type Filter</option> */}
            <option value="">All</option>
            <option value="Event">Event</option>
            <option value="Out Of Office">Out of office</option>
            <option value="Task">Task</option>
          </select>

          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "12rem" }}
            onClick={onClick}
          >
            Create Event
          </button>
        </div>
        <div className="row">
          {/* {items.} */}
          {/* {!items || items.length === 0 ? <p>NO</p> : items} */}

          {!items || items.length === 0 ? (
            <h2 style={{textAlign: "center",marginTop: "85px"}} >You have no Events.</h2>
          ) : (
            items.map((element, index) => {
              return (
                <EventItem
                  key={index}
                  title={element.title}
                  discription={
                    element.discription ? element.discription : "No discription"
                  }
                  date={element.date}
                  startTime={element.startTime}
                  endTime={element.endTime}
                  type={element.type}
                  attachment={element.attachment}
                  id={element.id}
                  changeHappen={changeHappen}
                  setChangeHappen={setChangeHappen}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
