import React, { Component, useState, useEffect } from "react";
import TicketContainer from "./TicketContainer";
import Dashboard from "./Dashboard";
import { Container } from "react-bootstrap";
import LoggedInNavbar from "./LoggedInNavbar";
import CreateTicket from "./CreateTicket";
import CreateTeam from "./CreateTeam";
import axios from "axios";

const ComponentControl = (props) => {
  const [dashboard, setDashboard] = useState(true);
  const [ticketContainer, setTicketContainer] = useState(false);
  const [searchTickets, setSearchTickets] = useState(false);
  const [ticketData, setTicketData] = useState(props.ticketList);

  console.log(props.teamId);
  const setDashboardHandler = () => {
    setSearchTickets(false);
    setTicketContainer(false);
    setDashboard(true);
  };

  const setTicketContainerHandler = () => {
    setDashboard(false);
    setSearchTickets(false);
    setTicketContainer(true);
    };

    console.log(props.team)
  const setSearchTicketsHandler = () => {
    setDashboard(false);
    setTicketContainer(false);
    setSearchTickets(true);
  };

  // useEffect(()=>{
  //   axios.get("http://localhost:4000/getTickets").then((response)=>{
  //     setTicketData(response.data)
  //   })
  // },[])
  if (!props.teamId) {
    return (
      <div>
        <LoggedInNavbar logout={props.logout} userName={props.userName}
          openDashboard={setDashboardHandler}
          openTicketContainer={setTicketContainerHandler}
          openSearchTickets={setSearchTicketsHandler}/>
        <CreateTeam userEmail={props.userEmail}></CreateTeam>
      </div>
    );
  }

  if (dashboard) {
    return (
      <div>
        <LoggedInNavbar
          openDashboard={setDashboardHandler}
          openTicketContainer={setTicketContainerHandler}
          openSearchTickets={setSearchTicketsHandler}
          userName={props.userName}
          logout={props.logout}
        ></LoggedInNavbar>
        <Dashboard

          userEmail={props.userEmail}
        />
      </div>
    );
  }

  if (ticketContainer) {
    return (
      <div>
        <LoggedInNavbar
          openDashboard={setDashboardHandler}
          openTicketContainer={setTicketContainerHandler}
          openSearchTickets={setSearchTicketsHandler}
          userName={props.userName}
          logout={props.logout}
        ></LoggedInNavbar>
        <TicketContainer ticketList={ticketData} userEmail={props.userEmail}></TicketContainer>
      </div>
    );
  }

  if (searchTickets) {
    return (
      <div>
        <LoggedInNavbar
          openDashboard={setDashboardHandler}
          openTicketContainer={setTicketContainerHandler}
          openSearchTickets={setSearchTicketsHandler}
          userName={props.userName}
          logout={props.logout}
        ></LoggedInNavbar>
        <CreateTicket userEmail={props.userEmail} setTicketContainer={setTicketContainerHandler} setDashboard={setDashboardHandler}></CreateTicket>
      </div>
    );
  }
};

export default ComponentControl;
