import react, { useState } from "react";
import Ticket from "./Ticket";
import { Form } from "react-bootstrap";
import styles from "./TicketContainer.module.css";
import FullTicketView from "./FullTicketView";

const TicketContainer = (props) => {
  const [ticketSearch, setTicketSearch] = useState("Search");

  const [viewTicket, setViewTicket] = useState(false);
  const [viewTicketID, setViewTicketID] = useState("");
  const [viewTicketTitle, setViewTicketTitle] = useState("");
  const [viewTicketDescription, setViewTicketDescription] = useState("");
  const [viewTicketCreator, setViewTicketCreator] = useState("");
  const [viewTicketTime, setViewTicketTime] = useState("");
  const [viewTicketStatus, setViewTicketStatus] = useState("");
  const [viewTicketAssigned, setViewTicketAssigned] = useState("");
  


    //calls from ticket.js
  const setViewTicketHandler = (ticket) => {
    setViewTicketID(ticket.id);
    setViewTicketTitle(ticket.title);
    setViewTicketDescription(ticket.description);
    setViewTicketCreator(ticket.creator);
    setViewTicketTime(ticket.time);
    setViewTicketStatus(ticket.status);
    setViewTicketAssigned(ticket.assigned)

    setViewTicket(true);
  };

  const setTicketSearchHandler = (event) => {
    event.preventDefault();
    setTicketSearch(event.target.value);
  };



  return (
    <div>
      {viewTicket == false ? (
        <div>
          <h1>This is the ticket Container</h1>
          <Form.Control
            size="md"
            type="text"
            placeholder={ticketSearch}
            onChange={setTicketSearchHandler}
          />
          {props.ticketList
            .filter((prop) => {
              if (ticketSearch === "Search") {
                return prop;
              } else if (
                prop.title.toLowerCase().includes(ticketSearch.toLowerCase())
              ) {
                return prop;
              }
            })
            .map((prop) => {
              return (
                <Ticket
                  id={prop.id}
                  title={prop.title}
                  description={prop.description}
                  creator={prop.creator}
                  time={prop.time}
                  status={prop.status}
                  assigned={prop.assigned}
                  viewTicket={setViewTicketHandler}
                ></Ticket>
              );
            })}{" "}
        </div>
      ) : (
            <FullTicketView 
                  id={viewTicketID}
                  title={viewTicketTitle}
                  description={viewTicketDescription}
                  creator={viewTicketCreator}
                  time={viewTicketTime}
                  status={viewTicketStatus}
                  assigned={viewTicketAssigned}
            />
      )}
    </div>
  );
};

export default TicketContainer;
