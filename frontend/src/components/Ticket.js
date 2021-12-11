import react, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import classes from "./Ticket.module.css";

const Ticket = (props) => {
  const setViewTicketHandler = () => {
    props.viewTicket({
      id: props.id,
      title: props.title,
      description: props.description,
      creator: props.creator,
      time: props.time,
      status: props.status,
      assigned: props.assigned,
    });
  };
  return (
    <div className={classes.ticket}>
      <div className={classes.ticket_time}>time created</div>
      <div className={classes.ticket_titlecontainer}>
        <div>{props.title}</div>
        <div>{props.description}</div>
      </div>
      <div>status</div>
      <div className={classes.ticket_open}>
        <Button variant="success">Open</Button>
      </div>
    </div>
  );
};

export default Ticket;
