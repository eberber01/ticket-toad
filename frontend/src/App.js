import "./App.css";
import { Button, Row, Col, Navbar, Container, ButtonGroup } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import TicketContainer from "./components/TicketContainer";

const fetchData = () => {
  return axios.get("https://random-data-api.com/api/appliance/random_appliance")
  .then((res)=>{
    console.log(res);
    const TICKETLIST = res.data
  })
  .catch((err) =>{
    console.error(err);
  })
}

function App() {
  const [user, setUser] = useState(null);
  const [loginPage, setLoginPage] = useState(false);

  useEffect(()=> {
    fetchData();
  },[])

  const logoutHandler = () => {
    setUser(null);
  };

  const loginHandler = (username) => {
    if (username != "Enter Email") {
      setLoginPage(false);
      setUser(username);
    }
  };

  const setLoginPageHandler = () => {
    setLoginPage(true);
  };

  const TICKETLIST = [
    {
      id: "001",
      title: "Sales printer Malfunctioning",
      description: "Sales printer is having troubles printing",
      creator: "Eric",
      time: "11:20",
      status: "pending",
      assigned: "Mario",
    },
  ];

  return (
    <div className="App">
      <Navbar variant="dark" bg="dark">
        <Container variant="light">
          <Navbar.Brand>Ticket Toad</Navbar.Brand>
          <Navbar.Toggle />
        </Container>
        {user == null ? (
          <Button variant="success" onClick={setLoginPageHandler}>
            Login
          </Button>
        ) : (
          <div>
            <Navbar.Text>
              Signed in as: <a href="#login">{user}</a>
            </Navbar.Text>
            <Button onClick={logoutHandler} variant="success">
              Logout
            </Button>
          </div>
        )}
      </Navbar>
      {user != null ? (
        <TicketContainer ticketList={TICKETLIST} />
      ) : (
        <h1>This is the home page</h1>
      )}
      {loginPage ? <Login LoginHandler={loginHandler} /> : <div></div>}
    </div>
  );
}

export default App;
