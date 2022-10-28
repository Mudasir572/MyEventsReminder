import React from "react";


export default function EventItem(props) {
  
  const { title, discription, type, date,id } = props;
  return (
    <>
    
    <div className="my-3 col-md-4" >
      <div className="card" style={{backgroundColor: "#d5e4f3"}}>
        <div className="card-body">
          <h5 className="cart-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {new Date(date).toLocaleString()}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">{type}</h6>
          <p className="card-text">{discription}</p>
          <button type="button" data-productid={id} className="btn btn-sm btn-primary">
            Update
          </button>
          <button type="button" data-productid={id} className="btn btn-sm btn-danger mx-3">
            Delete
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
