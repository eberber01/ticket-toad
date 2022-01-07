import  { useState, useEffect } from "react";
import Ticket from "./Ticket";
import axios from "axios";
import { Form, Row, Col} from "react-bootstrap";
import classes from "./TicketContainer.module.css";
import FullTicketView from "./FullTicketView";

const TicketContainer = (props) => {
  const [ticketSearch, setTicketSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("Active");
  const [userSearch, setUserSearch] = useState("Team");
  const [teamUsers, setTeamUsers] = useState([]);
  const [viewTicket, setViewTicket] = useState(false);
  const [ticketID, setTicketID] = useState("");
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    axios
      .post("https://git.heroku.com/ticket-toad.git/getTickets", {
        email: props.userEmail
      })
      .then((response) => {
        setTicketData(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .post("https://git.heroku.com/ticket-toad.git/getTeamUsers", {
        email: props.userEmail
      })
      .then((response) => {
        setTeamUsers(response.data);
      });
  }, []);

  //calls from ticket.js
  const setViewTicketHandler = (ticket) => {
    setTicketID(ticket._id);

    setViewTicket(true);
  };

  const setTicketSearchHandler = (event) => {
    event.preventDefault();
    setTicketSearch(event.target.value);
  };

  //calls from FullTicketView.js
  const closeViewTicketHandler = () => {
    setViewTicket(false);
  };

  const setStatusSearchHandler = (e) => {
    e.preventDefault();
    setStatusSearch(e.target.value);
  };

  const userSearchHandler = (e) => {
    e.preventDefault();
    setUserSearch(e.target.value);
  };

  if (!viewTicket) {
    return (
      <div>
        <div className={classes.ticket_title}>Tickets</div>
        <Form className={classes.ticket_search}>
          <Row>
            <Col xs={7}>
              <Form.Control
                size="md"
                type="text"
                placeholder="Search"
                onChange={setTicketSearchHandler}
              />
            </Col>
            <Col>
              <Form.Select onChange={setStatusSearchHandler}>
                <option>Active</option>
                <option>Ordered</option>
                <option>Delivered</option>
                <option>Deployed</option>
                <option>Pending</option>
                <option>Ordered</option>
                <option>Closed</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select onChange={userSearchHandler}>
                <option>Team</option>
                {teamUsers.map((user) => {
                  return <option key={user}>{user}</option>;
                })}
              </Form.Select>
            </Col>
          </Row>
        </Form>
        <div className={classes.ticket_container}>
          {ticketData
            .filter((ticket) => {
              if (
                userSearch === "Team" &&
                ticketSearch === "" &&
                statusSearch === "Active" &&
                ticket.status !== "Closed"
              ) {

                return ticket;

              } else if (
                userSearch === ticket.assigned &&
                (statusSearch === ticket.status ||
                  (statusSearch !== "Active" && ticket.status !== "Closed")) &&
                (ticket.title
                  .toLowerCase()
                  .includes(ticketSearch.toLowerCase().trim()) ||
                  ticket.description
                    .toLowerCase()
                    .includes(ticketSearch.toLowerCase().trim()))
              ) {

                return ticket;

              } else if (
                userSearch === "Team" &&
                (statusSearch === ticket.status ||
                  (statusSearch === "Active" && ticket.status !== "Closed")) &&
                (ticket.title
                  .toLowerCase()
                  .includes(ticketSearch.toLowerCase().trim()) ||
                  ticket.description
                    .toLowerCase()
                    .includes(ticketSearch.toLowerCase().trim()))
              ) {

                return ticket;
                
              }
            })
            .map((ticket) => {
              return (
                <Ticket
                  key={ticket._id}
                  _id={ticket._id}
                  id={ticket.id}
                  title={ticket.title}
                  description={ticket.description}
                  creator={ticket.creator}
                  date={ticket.date}
                  status={ticket.status}
                  assigned={ticket.assigned}
                  viewTicket={setViewTicketHandler}
                ></Ticket>
              );
            })}
        </div>
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
export default TicketContainer;
