import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
export default function EventItem(props) {
  const navigate = useNavigate();
  const {
    title,
    discription,
    type,
    date,
    startTime,
    endTime,
    id,
    attachment,
    setChangeHappen,
    changeHappen,
  } = props;
  console.log(attachment);
  // const reader = new FileReader();
  // console.log(reader.readAsDataURL(attachment))
  const datetoConcate = new Date(date);
  console.log(new Date(date).toISOString());
  console.log(new Date(date));
  const startTimeT = moment(datetoConcate)
    .add(startTime.split(":")[0], "h")
    .add(startTime.split(":")[1], "m")
    .format();
  const endTimeT = moment(datetoConcate)
    .add(endTime.split(":")[0], "h")
    .add(endTime.split(":")[1], "m")
    .format();
  console.log(
    moment(datetoConcate)
      .add(endTime.split(":")[0] - 5, "h")
      .add(endTime.split(":")[1], "m")
      .local()
      .format("hh:mm A")
  );
  console.log(
    moment(datetoConcate)
      .add(startTime.split(":")[0] - 5, "h")
      .add(startTime.split(":")[1], "m")
      .local()
      .format("hh:mm A")
  );
  // console.log(datetoConcate)
  // console.log(startTime.split(":")[0])
  // console.log(endTime.split(":")[0])

  const updateEventForm = (e) => {
    navigate("/updateevent", {
      state: {
        eventTitle: title,
        eventDiscription: discription,
        eventType: type,
        eventDate: date,
        eventStart: startTime,
        eventEnd: endTime,
        eventId: id,
        eventAttachment: attachment,
      },
    });
  };
  const getAttachedFile = (e) => {
    const dataURI = attachment;
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);
    // var byteString  = Buffer.from(dataURI, 'base64');

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    console.log(blob);
    e.target.download = "file";
    e.target.href = URL.createObjectURL(blob);
    console.log(URL.createObjectURL(blob));
    // return blob;
  };

  const deleteEvent = (e) => {
    console.log(e.target.getAttribute("data-eventid"));
    const allEvents = JSON.parse(window.localStorage.getItem("allEvents"));
    const newAllEvents = allEvents.filter((eventtt) => {
      return eventtt.id !== e.target.getAttribute("data-eventid");
    });
    window.localStorage.setItem("allEvents", JSON.stringify(newAllEvents));
    if (changeHappen === true) {
      setChangeHappen(false);
    } else {
      setChangeHappen(true);
    }
  };
  return (
    <>
      {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Deletion</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        You realy want to delete this event
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button"  data-eventid={id} onClick={deleteEvent} className="btn btn-primary" data-bs-dismiss="modal">Delete</button>
      </div>
    </div>
  </div>
</div> */}
      <div className="my-3 col-md-4">
        <div className="card" style={{ backgroundColor: "#d5e4f3" }}>
          <div className="card-body">
            <h5 className="cart-title">{title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {new Date(date).toDateString()}
            </h6>
            <div>
              {moment(datetoConcate)
                .add(startTime.split(":")[0] - 5, "h")
                .add(startTime.split(":")[1], "m")
                .local()
                .format("hh:mm A") +
                " - " +
                moment(datetoConcate)
                  .add(endTime.split(":")[0] - 5, "h")
                  .add(endTime.split(":")[1], "m")
                  .local()
                  .format("hh:mm A")}
              {/* {moment(datetoConcate + " " + startTime).format()}    */}
              {/* {new Date(new Date(date).getTime()) + " - " + new Date(new Date(date).getTime())} */}
            </div>
            <h6 className="card-subtitle mb-2 text-muted">{type}</h6>
            <p className="card-text">{discription}</p>
            {/* <button type="button" className="btn btn-sm btn-primary" href="" onClick={getAttachedFile}>Get File</button> */}

            {/* <span>{attachment}</span> */}
            <button
              type="button"
              data-eventid={id}
              onClick={updateEventForm}
              className="btn btn-sm btn-primary"
            >
              Update
            </button>
            <button
              type="button"
              data-eventid={id}
              onClick={deleteEvent}
              className="btn btn-sm btn-danger mx-3"
            >
              Delete
            </button>
            {/* <button type="button" className="btn btn-sm btn-danger mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Delete
</button> */}

            {attachment && attachment !== "" ? (
              <a href="" onClick={getAttachedFile}>
                <svg
                  pointerEvents="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-filetype-pdf"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"
                  />
                </svg>
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
