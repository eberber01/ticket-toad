import react, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import classes from "./Ticket.module.css";

const Ticket = (props) => {
  const setViewTicketHandler = () => {
    console.log(props._id)
    props.viewTicket({
      _id: props._id,
      id: props.id,
      title: props.title,
      description: props.description,
      creator: props.creator,
      time: props.time,
      status: props.status,
      assigned: props.assigned,
    });
  };


  const returnDescription = () => {
   if(props.description.length > 105){
     return props.description.slice(0, 105) + " ...."
   } 
   else{ return props.description}
  }
  
  return (
    <div className={classes.ticket}>
      <div className={classes.ticket_time}>{props.date}</div>
      <div className={classes.ticket_titlecontainer}>
        <div>
          <h1 className={classes.ticket_title}>{props.title}</h1>
        </div>
        <div>{returnDescription()}</div>
      </div>
      <div className={classes.ticket_statuscontainer}>
        <div>{props.status}</div>

      </div>
      <div className={classes.ticket_button}>
        <Button variant="success" onClick={setViewTicketHandler}>
          Open
        </Button>
      </div>
    </div>
  );
};

export default Ticket;
