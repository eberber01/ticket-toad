import react from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

const LoggedInNavbar = (props) => {
    const openDashboard = () => {
        props.openDashboard();
    }

    const openSearchTickets= () => {
        props.openSearchTickets();
    }

    const openTicketContainer = () => {
        props.openTicketContainer();
    }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Ticket Toad</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={openDashboard} >Dashboard</Nav.Link>
            <Nav.Link onClick={openTicketContainer} >Tickets</Nav.Link>
            <Nav.Link onClick={openSearchTickets} >Create Ticket</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">{props.userName}</a>
            </Navbar.Text>
          </Navbar.Collapse>
          <Button variant="success" style={{ marginLeft: "5%"}} onClick={props.logout}>Sign Out</Button>
        </Container>
      </Navbar>
    </div>
  );
};

export default LoggedInNavbar;
