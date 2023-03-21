import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
moment().format();
console.log(moment().format());
console.log(new Date(2022, 9, 3, 14, 30, 0).toTimeString());
export default function Form() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});

  function generateId() {
    let id = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 12; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
  }

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    type: "Event",
    date: "",
    startTime: "",
    endTime: "",
    attachment: "",
  });
  const [attachmentFile,setAttachmentFile] = useState("") 
  const validate = (values) => {
    const errors = {};
    const allTheEvents = JSON.parse(window.localStorage.getItem("allEvents"));
    console.log(allTheEvents);
    if (
      !values.title ||
      values.title.trim() === "" ||
      values.description.trim().length <= 3
    ) {
      errors.titleError = "Title should be greater then three characters";
    }
    if (
      !values.description ||
      values.description.trim() === "" ||
      values.description.trim().length <= 5
    ) {
      errors.disError = "Discription should be greater then five characters";
    }
    if (
      !values.date ||
      values.date === "" ||
      new Date(values.date).getTime() <
        new Date().getTime() - 24 * 60 * 60 * 1000
    ) {
      errors.dateError = "Date should be in future or current";
    }
    if (
      !values.startTime ||
      values.startTime === "" ||
      moment(values.date)
        .add(values.startTime.split(":")[0] - 5, "h")
        .add(values.startTime.split(":")[1], "m")
        .valueOf() <
        new Date().getTime() - 5 * 60 * 60 * 1000
    ) {
      errors.startTimeError = "Start time should be in future";
    }
    if (
      !values.endTime ||
      values.endTime === "" ||
      moment(values.date)
        .add(values.endTime.split(":")[0] - 5, "h")
        .add(values.endTime.split(":")[1], "m")
        .valueOf() <
        new Date().getTime() - 5 * 60 * 60 * 1000 ||
      moment(values.date)
        .add(values.endTime.split(":")[0] - 5, "h")
        .add(values.endTime.split(":")[1], "m")
        .valueOf() <=
        moment(values.date)
          .add(values.startTime.split(":")[0] - 5, "h")
          .add(values.startTime.split(":")[1], "m")
          .valueOf()
    ) {
      errors.endTimeError = "end time should be greater then start time";
    }
    if (
      !values.startTime ||
      values.startTime === "" ||
      moment(values.date)
        .add(values.startTime.split(":")[0] - 5, "h")
        .add(values.startTime.split(":")[1], "m")
        .valueOf() <
        new Date().getTime() - 5 * 60 * 60 * 1000
    ) {
      errors.startTimeError = "Start time should be in future";
    }
    if (allTheEvents && allTheEvents.length > 0) {
      for (let event of allTheEvents) {
        const eventDate = new Date(event.date);
        const valuesDate = new Date(values.date);
        if (
          (moment(valuesDate)
            .add(values.startTime.split(":")[0] - 5, "h")
            .add(values.startTime.split(":")[1], "m")
            .valueOf() >=
            moment(eventDate)
              .add(event.startTime.split(":")[0] - 5, "h")
              .add(event.startTime.split(":")[1], "m")
              .valueOf() &&
            moment(valuesDate)
              .add(values.startTime.split(":")[0] - 5, "h")
              .add(values.startTime.split(":")[1], "m")
              .valueOf() <
              moment(eventDate)
                .add(event.endTime.split(":")[0] - 5, "h")
                .add(event.endTime.split(":")[1], "m")
                .valueOf()) ||
          (moment(valuesDate)
            .add(values.endTime.split(":")[0] - 5, "h")
            .add(values.endTime.split(":")[1], "m")
            .valueOf() >
            moment(eventDate)
              .add(event.startTime.split(":")[0] - 5, "h")
              .add(event.startTime.split(":")[1], "m")
              .valueOf() &&
            moment(valuesDate)
              .add(values.endTime.split(":")[0] - 5, "h")
              .add(values.endTime.split(":")[1], "m")
              .valueOf() <
              moment(eventDate)
                .add(event.endTime.split(":")[0] - 5, "h")
                .add(event.endTime.split(":")[1], "m")
                .valueOf())
        ) {
          // errors.endTimeError = "end time should be greater then start time"
          errors.eventExistsAtThatTime = "An event is already scheduled at the selected timings change and try again.";
          break;
        }
      }
    }
    console.log(
      moment(values.date)
        .add(values.startTime.split(":")[0] - 5, "h")
        .add(values.startTime.split(":")[1], "m")
        .valueOf()
    );
    // console.log(moment(allTheEvents[0].date).add(allTheEvents[0].startTime.split(":")[0] - 5, 'h').add(allTheEvents[0].startTime.split(":")[1],'m').valueOf())
    console.log("selecteddate", new Date(values.date).getTime());
    console.log("currentdate", new Date().getTime());

    console.log(errors);

    return errors;
  };

  const handleSubmit = (e) => {
    // const navigate = useNavigate();
    e.preventDefault();

    if (!JSON.parse(window.localStorage.getItem("allEvents"))) {
      localStorage.setItem("allEvents", JSON.stringify([]));
    }
    // localStorage.addItem({note.title, note.description, note.tag});
    

    const file = formValues.attachment;
    console.log(file);
    const theEvent = {
      title: formValues.title,
      discription: formValues.description,
      type: formValues.type,
      date: new Date(formValues.date),
      startTime: formValues.startTime,
      endTime: formValues.endTime,
      attachment: attachmentFile,
      id: generateId(),
    };
    // console.log(theEvent.date)
    // console.log(formValues.date)
    // console.log(moment(theEvent.startTime).format())
    // console.log(validate(formValues))
    const validationResults = validate(formValues);
    setFormErrors(validationResults);
    console.log(formErrors);
    console.log(Object.keys(validationResults).length !== 0);
    if (Object.keys(validationResults).length !== 0) {
      console.log("an error accured");
      // setFormErrors({})
      return;
    }

    console.log(theEvent.date.toISOString() + "this is iso");
    console.log(theEvent);
    // if(new Date().getTime() > new Date(theEvent.date).getTime()){
    //     // console.log("stoped")
    //     setError(true)
    //     return
    // }

    let eventsData = JSON.parse(window.localStorage.getItem("allEvents"));
    eventsData.push(theEvent);

    window.localStorage.setItem("allEvents", JSON.stringify(eventsData));
    setFormValues({
      title: "",
      description: "",
      type: "",
      date: "",
      startTime: "",
      endTime: "",
      attachment: "",
    });
    navigate("/events");
  };

  const onChange = (e) => {
    if(e.target.name === "attachment"){
      const fileData = e.target.files[0];

      const reader = new FileReader();

reader.onload = (event) => {
  // localStorage.setItem("file", event.target.result);
  setAttachmentFile(event.target.result)
  console.log("working")
}
reader.readAsDataURL(fileData);
     
      setFormValues({...formValues, [e.target.name]: e.target.value})
      console.log(e.target.files[0])
    }else{

      setFormValues({ ...formValues, [e.target.name]: e.target.value });
      console.log(e.target.value)
    }
  };
//   const onChangeForFile = (e) => {
//     const fileData = e.target.files[0];
    

//     const reader = new FileReader();

//     const fileUrl = reader.readAsDataURL(fileData);
// console.log(fileUrl)
//     setFormValues({...formValues, [e.target.name]: fileUrl})
//     console.log(e.target.files[0])
//   }
  return (
    <div
      className="container"
      style={{ marginTop: "85px", maxWidth: "45rem", width: "87%" }}
    >
      <h2 className="text-center">Create An Event</h2>
      <form className="my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Event Name
          </label>
          <input
            type="text"
            className="form-control"
            value={formValues.title}
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            // minLength={4}
            // required
          />
          <p style={{ color: "red" }}>{formErrors.titleError}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            value={formValues.description}
            id="description"
            name="description"
            onChange={onChange}
            //  minLength={5}
          />
          <p style={{ color: "red" }}>{formErrors.disError}</p>
        </div>
        <div className="my-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>

          <select
            className="form-select"
            // defaultValue={"Event"}

            value={formValues.type}
            id="type"
            name="type"
            // aria-label="Default select example"
            onChange={onChange}
            required
          >
            <option value="Event">Event</option>
            {/* <option value="1">Event</option> */}
            <option value="Out Of Office">Out of office</option>
            <option value="Task">Task</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Event Date
          </label>
          <input
            type="date"
            className="form-control"
            value={formValues.date}
            id="date"
            name="date"
            onChange={onChange}
            required
          />
          {/* {error && <p className="" style={{color: "red"}} >Date Should be in future</p>} */}
          <p style={{ color: "red" }}>{formErrors.dateError}</p>
        </div>

        {/* <div className="mb-3" style={{display: "flex"}} >  */}
        <div className="mb-3">
          <label htmlFor="starttime" className="form-label">
            Start Time
          </label>
          <input
            type="time"
            className="form-control"
            id="starttime"
            value={formValues.startTime}
            name="startTime"
            onChange={onChange}
            required
          />
          <p style={{ color: "red" }}>{formErrors.startTimeError}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="endtime" className="form-label">
            End Time
          </label>
          <input
            type="time"
            className="form-control"
            id="endtime"
            value={formValues.endTime}
            name="endTime"
            onChange={onChange}
            required
          />
          <p style={{ color: "red" }}>{formErrors.endTimeError}</p>
        </div>

        {/* </div> */}
        <div className="mb-3">
          <label htmlFor="attachment" className="form-label">
            Attachment if any
          </label>
          <input
            type="file"
            accept=".pdf"
            value={formValues.attachment}
            className="form-control"
            id="attachment"
            name="attachment"
            onChange={onChange}
          />
        </div>
        <p style={{ color: "red" }}>{formErrors.eventExistsAtThatTime}</p>
        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
}
