import React from "react";
import classes from "./UserLogStatus.module.css";

export default function UserLogStatus({name, user, email, logout}) {
  return (<div className="dashboard">
    <div className="dashboard__container">
    Logged in as
      <div>{user?.email}</div>
      <button className="dashboard__btn" onClick={logout}>Logout</button>
    </div>
  </div>);
}
  
  