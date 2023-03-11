import React from "react";
import moment from "moment";

export default function EventItem(props) {
  
  const { title, discription, type, date,startTime,endTime,id,attachment } = props;
  console.log(attachment)
  // const reader = new FileReader();
  // console.log(reader.readAsDataURL(attachment)) 
  const datetoConcate = new Date(date);
  console.log(new Date(date).toISOString())
  console.log(new Date(date))
  const startTimeT = moment(datetoConcate).add(startTime.split(":")[0], 'h').add(startTime.split(":")[1],'m').format()
  const endTimeT = moment(datetoConcate).add(endTime.split(":")[0], 'h').add(endTime.split(":")[1],'m').format();
  console.log(moment(datetoConcate).add(endTime.split(":")[0] - 5, 'h').add(endTime.split(":")[1],'m').local().format("hh:mm A"));
  console.log(moment(datetoConcate).add(startTime.split(":")[0] - 5, 'h').add(startTime.split(":")[1],'m').local().format("hh:mm A"));
  // console.log(datetoConcate)
  // console.log(startTime.split(":")[0])
  // console.log(endTime.split(":")[0])
  return (
    <>
    
    <div className="my-3 col-md-4" >
      <div className="card" style={{backgroundColor: "#d5e4f3"}}>
        <div className="card-body">
          <h5 className="cart-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {new Date(date).toDateString()}
          </h6>
          <div>
                  {moment(datetoConcate).add(startTime.split(":")[0] - 5, 'h').add(startTime.split(":")[1],'m').local().format("hh:mm A") +
                    " - " +
                    moment(datetoConcate).add(endTime.split(":")[0] - 5, 'h').add(endTime.split(":")[1],'m').local().format("hh:mm A")}
                    {/* {moment(datetoConcate + " " + startTime).format()}    */}
                    {/* {new Date(new Date(date).getTime()) + " - " + new Date(new Date(date).getTime())} */}
                </div>
          <h6 className="card-subtitle mb-2 text-muted">{type}</h6>
          <p className="card-text">{discription}</p>
          <span>{attachment}</span>
          <button type="button" data-eventid={id} className="btn btn-sm btn-primary">
            Update
          </button>
          <button type="button" data-eventid={id} className="btn btn-sm btn-danger mx-3">
            Delete
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
