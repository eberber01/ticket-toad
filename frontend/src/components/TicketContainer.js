import react, { useState, useEffect } from "react";
import Ticket from "./Ticket";
import axios from "axios";
import { Form, Row, Col, Pagination } from "react-bootstrap";
import classes from "./TicketContainer.module.css";
import FullTicketView from "./FullTicketView";

const TicketContainer = (props) => {
  const [ticketSearch, setTicketSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("Active");
  const [userSearch, setUserSearch] = useState("Team")
  const [teamUsers, setTeamUsers] = useState([])
  const [viewTicket, setViewTicket] = useState(false);
  const [ticketID, setTicketID] = useState("");
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ ticketsPerPage, setTicketsPerPage] = useState(10) 

  useEffect(()=>{
    axios.post("http://localhost:4000/getTickets",{
      email: props.userEmail
    }).then((response)=>{
      
      
     setTicketData(response.data)
      
    })
  },[])

  useEffect(()=>{
    axios.post("http://localhost:4000/getTeamUsers",{
      email:props.userEmail
    }).then((response)=>{
      setTeamUsers(response.data)

    })
  },[])
  

  //calls from ticket.js
  const setViewTicketHandler = (ticket) => {
    console.log(ticket._id);
    setTicketID(ticket._id);

    setViewTicket(true);
  };

  const setTicketSearchHandler = (event) => {
    event.preventDefault();
    setTicketSearch(event.target.value);
  };

  //calls from FullTicketView.js
  const closeViewTicketHandler = () => {
    console.log("close")
    setViewTicket(false);
  };

  const setStatusSearchHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setStatusSearch(e.target.value);
  };

  const userSearchHandler = (e)=>{
    e.preventDefault();
    setUserSearch(e.target.value)
  }

  console.log(userSearch)


  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = ticketData.slice(indexOfFirstTicket, indexOfLastTicket)

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
                {teamUsers.map((user)=>{
                  return(<option key={user}>{user}</option>)
                })}
              </Form.Select>
            </Col>
          </Row>
        </Form>
        <div className={classes.ticket_container}>
          {currentTickets
            .filter((prop) => {
              if ((ticketSearch === "") && (statusSearch == "Active") && (prop.status != "Closed") && (userSearch == "Team")) {
                return prop;
              } if (
                (prop.title.toLowerCase().includes(ticketSearch.toLowerCase())) && (prop.status.trim() == statusSearch) && (prop.assigned.trim() == userSearch.trim())
              ) { 
                return prop;
              }

            })
            .map((prop) => {

              
              return (
                <Ticket
                  key={prop._id}
                  _id={prop._id}
                  id={prop.id}
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
      </div>
    );
  }

  if (viewTicket) {
    return (
      <FullTicketView _id={ticketID} closeTicket={closeViewTicketHandler} userEmail={props.userEmail}/>
    );
  }
};

export default TicketContainer;
