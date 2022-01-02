import React from "react";
import { Navbar, Button, Container } from "react-bootstrap";

const LoginNavbar = (props) => {

    const loginPageHandler = () =>{
        props.login();
    }



  return (
    <div className="App">
      <Navbar variant="dark" bg="dark">
        <Container variant="light">
          <Navbar.Brand>Ticket Toad</Navbar.Brand>
          <Navbar.Toggle />
        </Container>
        <Button variant="success" onClick={loginPageHandler} style={{marginRight: "10%"}}>
          Login
        </Button>
      </Navbar>
    </div>
  );
};

export default LoginNavbar;
