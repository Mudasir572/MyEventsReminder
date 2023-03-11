import React ,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import moment from "moment";

import EventItem from "./EventItem";
export default function Events() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  function onClick(){

    navigate('/createevent')
  }
  async function updatePage(){
    const allEvents = JSON.parse(window.localStorage.getItem('allEvents'));
    // console.log(allEvents)
    const sortedEvents = allEvents.sort((e1, e2) => (moment(new Date(e1.date))
    .add(e1.startTime.split(":")[0] - 5, "h")
    .add(e1.startTime.split(":")[1], "m")
    .valueOf() > moment(new Date(e2.date))
    .add(e2.startTime.split(":")[0] - 5, "h")
    .add(e2.startTime.split(":")[1], "m")
    .valueOf()) ? 1 : (moment(new Date(e1.date))
    .add(e1.startTime.split(":")[0] - 5, "h")
    .add(e1.startTime.split(":")[1], "m")
    .valueOf() < moment(new Date(e2.date))
    .add(e2.startTime.split(":")[0] - 5, "h")
    .add(e2.startTime.split(":")[1], "m")
    .valueOf()) ? -1 : 0);
    // const sortedEvents = 
    setItems(sortedEvents)
  }

  useEffect(()=>{
    
   updatePage()
 },[])



  return (
    <>
    <h2 className="text-center" style={{marginTop: "85px"}}>All Events</h2>
      <div className="container" style={{marginTop: "30px"}}>
    <button type="button" className="btn btn-primary" style={{width: "12rem"} } onClick={onClick} >Create Event</button>
        <div className="row">
          {/* {items.} */}
          {/* {!items || items.length === 0 ? <p>NO</p> : items} */}

          
          {!items || items.length === 0 ? <h2>NO Events are set yet.</h2> : items.map((element,index) => {
           
           return (
             
               <EventItem     key={index} 
                  title={element.title}
                  discription={element.discription ? element.discription : "No discription"}
                  date={element.date}
                  startTime={element.startTime}
                  endTime={element.endTime}
                  type={element.type}
                  attachment={element.attachment}
                  id={element.id}
               />
             
           );
         })}


   
   </div>
      </div>
    </>
  );
}
