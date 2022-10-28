import React from 'react'
import {Link} from "react-router-dom";
export default function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-light fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Events Reminder</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/events">Events</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/calander">Calender</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/createevent">Create Event</Link>
        </li>
        {/* <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="#">Action</Link></li>
            <li><Link className="dropdown-item" to="#">Another action</Link></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link disabled">Disabled</Link>
        </li> */}
      </ul>
      
    </div>
  </div>
</nav>
    </div>
  )
}
