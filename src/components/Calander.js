import React, {useState,useEffect} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import EventItem from './EventItem';
import { useNavigate } from "react-router-dom";
import "./Calander.css";

export default function Calander() {
  const navigate = useNavigate();
  const [dateState, setDateState] = useState(new Date())
  const [items, setItems] = useState([]);
  const changeDate = (e) => {
    setDateState(e)
  }
  async function updatePage() {
    const allEvents = JSON.parse(window.localStorage.getItem("allEvents"));
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


    
    const eventsForSelecteddate = sortedEvents.filter((eventt)=>{
    console.log(new Date(eventt.date).toDateString())
    const DateOfEvent = new Date(eventt.date).toDateString()
   const DateSelected = dateState.toDateString()
    console.log(dateState.toDateString())
         return DateOfEvent == DateSelected;
    })
    
    
      setItems(eventsForSelecteddate);

  }



 
  function onClick() {
    navigate("/createevent");
  }
  
  useEffect(() => {
    updatePage();
  },[dateState]);


  return (
    <>
    
    <button
            type="button"
            className="btn btn-primary"
            style={{ width: "12rem",marginTop: "4.5rem",marginBottom: "1rem",marginLeft: "30px"}}
            onClick={onClick}
          >
            Create Event
          </button>
      <Calendar 
      value={dateState}
      onChange={changeDate}
  
      />
    <p className='selected-date'>Events scheduled for <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>

    
    <div className="row" style={{margin: "auto 15px"}}>
          {/* {items.} */}
          {/* {!items || items.length === 0 ? <p>NO</p> : items} */}

          {!items || items.length === 0 ? (
            <h2 style={{textAlign: "center",marginTop: "85px"}}>NO Events are scheduled for {moment(dateState).format('MMMM Do YYYY')}.</h2>
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
                />
              );
            })
          )}
        </div>
    
    </>
  )
}


