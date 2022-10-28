import React ,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import EventItem from "./EventItem";
export default function Events(props) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  function onClick(){

    navigate('/createevent')
  }
  async function updatePage(){
    const allEvents = JSON.parse(window.localStorage.getItem('allEvents'));
    // console.log(allEvents)
    // const sortedEvents = 
    setItems(allEvents)
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
                  type={element.type}
                  id={element.id}
               />
             
           );
         })}


   
   </div>
      </div>
    </>
  );
}
