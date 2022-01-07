import { useEffect, useState } from "react";
import Ticket from "./Ticket";
import classes from "./Dashboard.module.css";
import FullTicketView from "./FullTicketView";
import axios from "axios";

const Dashboard = (props) => {
  const [viewTicket, setViewTicket] = useState(false);
  const [ticketID, setTicketID] = useState();
  const [ticketData, setTicketData] = useState([]);
  //calls from ticket.js
  const setViewTicketHandler = (ticket) => {
    console.log(ticket._id);
    setTicketID(ticket._id);
    setViewTicket(true);
  };

  useEffect(() => {
    axios
      .post("http://localhost:4000/getTickets", {
        email: props.userEmail,
      })
      .then((response) => {
        console.log(response.data);
        setTicketData(response.data);
      });
  }, []);

  //calls from FullTicketView.js
  const closeViewTicketHandler = () => {
    setViewTicket(false);
  };

  if (!viewTicket) {
    return (
      <div className={classes.dashboard_container}>
        <div className={classes.dashboard_title}>Dashboard</div>
        <div className={classes.dashboard_tickets}>
          {ticketData
            .filter((prop) => {
              if (
                prop.assigned.toLowerCase().includes(props.userEmail) &&
                prop.status != "Closed"
              ) {
                return prop;
              }
            })
            .map((prop) => {
              return (
                <Ticket
                  key={prop._id}
                  _id={prop._id}
                  title={prop.title}
                  description={prop.description}
                  creator={prop.creator}
                  date={prop.date}
                  status={prop.status}
                  assigned={prop.assigned}
                  viewTicket={setViewTicketHandler}
                ></Ticket>
              );
            })}
        </div>
        <div></div>
      </div>
    );
  }

  if (viewTicket) {
    return (
      <FullTicketView
        _id={ticketID}
        closeTicket={closeViewTicketHandler}
        userEmail={props.userEmail}
      />
    );
  }
};

export default Dashboard;
