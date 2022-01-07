import { useState } from "react";
import TicketContainer from "./TicketContainer";
import Dashboard from "./Dashboard";
import LoggedInNavbar from "./LoggedInNavbar";
import CreateTicket from "./CreateTicket";
import CreateTeam from "./CreateTeam";
import AdminPage from "./AdminPage";

const LoggedIn = (props) => {
  const [dashboard, setDashboard] = useState(true);
  const [ticketContainer, setTicketContainer] = useState(false);
  const [searchTickets, setSearchTickets] = useState(false);
  const [adminPage, setAdminPage] = useState(false);
  const [ticketData, setTicketData] = useState(props.ticketList);

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

  const setAdminPageHandler = () => {
    setDashboard(false);
    setSearchTickets(false);
    setTicketContainer(false);
    setAdminPage(true);
  };

  console.log(props.team);
  const setSearchTicketsHandler = () => {
    setDashboard(false);
    setTicketContainer(false);
    setSearchTickets(true);
  };

  if (!props.teamId) {
    return (
      <div>
        <LoggedInNavbar
          logout={props.logout}
          userName={props.userName}
          openDashboard={setDashboardHandler}
          openTicketContainer={setTicketContainerHandler}
          openSearchTickets={setSearchTicketsHandler}
          openAdminPage={setAdminPageHandler}
        />
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
          openAdminPage={setAdminPageHandler}
          userEmail={props.userEmail}
          userName={props.userName}
          logout={props.logout}
        ></LoggedInNavbar>
        <Dashboard userEmail={props.userEmail} />
      </div>
    );
  }

  if (ticketContainer) {
    return (
      <div>
        <LoggedInNavbar
          openDashboard={setDashboardHandler}
          openAdminPage={setAdminPageHandler}
          openTicketContainer={setTicketContainerHandler}
          openSearchTickets={setSearchTicketsHandler}
          userName={props.userName}
          logout={props.logout}
          userEmail={props.userEmail}
        ></LoggedInNavbar>
        <TicketContainer
          ticketList={ticketData}
          userEmail={props.userEmail}
        ></TicketContainer>
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
          openAdminPage={setAdminPageHandler}
          userName={props.userName}
          logout={props.logout}
          userEmail={props.userEmail}
        ></LoggedInNavbar>
        <CreateTicket
          userEmail={props.userEmail}
          setTicketContainer={setTicketContainerHandler}
          setDashboard={setDashboardHandler}
        ></CreateTicket>
      </div>
    );
  }
  if (adminPage) {
    return (
      <div>
        <LoggedInNavbar
          openDashboard={setDashboardHandler}
          openAdminPage={setAdminPageHandler}
          openTicketContainer={setTicketContainerHandler}
          openSearchTickets={setSearchTicketsHandler}
          userName={props.userName}
          logout={props.logout}
          userEmail={props.userEmail}
        ></LoggedInNavbar>
        <AdminPage userEmail={props.userEmail}></AdminPage>
      </div>
    );
  }
};

export default LoggedIn;
