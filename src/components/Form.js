import React, { useState, } from "react";
import { useNavigate } from 'react-router-dom';


export default function Form() {
  const [error,setError] = useState(false);
  const navigate = useNavigate();

  function generateId() {
    let id = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 12; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
  }

    
  const [evant, setEvant] = useState({
    title: "",
    description: "",
    type:  "",
    date:  "",
    attachment:  "",
  });

  const handleSubmit = (e) => {
    
    // const navigate = useNavigate();
    e.preventDefault();
    if(!JSON.parse(window.localStorage.getItem("allEvents"))){
        localStorage.setItem("allEvents",JSON.stringify([]))
    }
    // localStorage.addItem({note.title, note.description, note.tag});
    console.log(evant);
    const theEvant = {
      title: evant.title,
      discription: evant.description,
      type: evant.type,
      date: new Date(evant.date),
    
      attachment: evant.attachment,
      id: generateId()
    };
    console.log(theEvant)
    if(new Date().getTime() > new Date(theEvant.date).getTime()){
        // console.log("stoped")
        setError(true)
        return
    }
    setError(false)
     
    let eventsData = JSON.parse(window.localStorage.getItem("allEvents"));
        eventsData.push(theEvant)
    
    window.localStorage.setItem("allEvents", JSON.stringify(eventsData));
    setEvant({
        title: "",
        description: "",
        type:  "",
        date:  "",
        attachment:  "",
    });
    navigate('/events');
  };
  //     const [items, setItems] = useState([]);
//   console.log(JSON.parse(localStorage.getItem("Event")));
  // useEffect(() => {
  //   localStorage.setItem('items', JSON.stringify(items));
  // }, []);

  const onChange = (e) => {
    setEvant({ ...evant, [e.target.name]: e.target.value });
    // console.log(e.target.value)
  };
  return (
    <div className="container" style={{ marginTop: "85px" }}>
      <h2>Create An Event</h2>
      <form className="my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Event Name
          </label>
          <input
            type="text"
            className="form-control"
            value={evant.title}
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={4}
            required
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            value={evant.description}
            id="description"
            name="description"
            onChange={onChange}
           minLength={5}
           
          />
        </div>
        <div className="my-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>

          <select
            className="form-select"
            value={evant.type}
            id="type"
            name="type"
            aria-label="Default select example"
            onChange={onChange}
            required
          >
            <option defaultValue={"Event"} value="Evant">
              Event
            </option>
            {/* <option value="1">Event</option> */}
            <option value="outofoffice">Out of office</option>
            <option value="task">Task</option>
          </select>
        </div>
        <div className="mb-3">
          
          <label htmlFor="date" className="form-label">
            Event Date and Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            value={evant.date}
            id="date"
            name="date"
            onChange={onChange}
            required
            
          />
          {error && <p className="" style={{color: "red"}} >Date Should be in future</p>}
        </div>

        {/* <div className="mb-3" style={{display: "flex"}} >  */}
        {/* <div className="mb-3">
          <label htmlFor="starttime" className="form-label">
            Duration
          </label>
          <input
            type="time"
            className="form-control"
            id="duration"
            value={evant.duration}
            name="duration"
            onChange={onChange}
            required
          />
        </div> */}

       
        {/* </div> */}
        <div className="mb-3">
          <label htmlFor="attachment" className="form-label">
            Attachment
          </label>
          <input
            type="file"
            accept=".pdf"
            value={evant.attachment}
            className="form-control"
            id="attachment"
            name="attachment"
            onChange={onChange}
          />
        </div>

        <button type="submit"  className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
}
