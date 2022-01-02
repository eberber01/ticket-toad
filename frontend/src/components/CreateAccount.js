
import react, { useState } from "react";
import classes from "./CreateAccount.module.css";

import {
  Button,
  Row,
  Col,
  Navbar,
  Container,
  Form,
  Alert,
} from "react-bootstrap";
import "react-bootstrap";
import axios from "axios";

const CreateAccount = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("Enter Email");
  const [enteredPassword, setEnteredPassword] = useState("Password");
  const [enteredName, setEnteredName] = useState("")

  const submitFormLogin = (e) => {
    e.preventDefault()
     axios.post("http://localhost:4000/createAccount",{
       email: enteredUsername,
       password: enteredPassword,
       name: enteredName
     }).then((response)=>{
      
      
       
      
     }) 
  
    
  };

  const setEnteredUsernameHandler = (event) => {
    event.preventDefault();
    setEnteredUsername(event.target.value);
  };

  const setEnteredPasswordHandler = (event) => {
    event.preventDefault();
    setEnteredPassword(event.target.value);
  };

  const setEnteredNameHandler = (event) => {
    event.preventDefault();
    setEnteredName(event.target.value)
  }
  return (
    <div className={classes.createaccount_container}>
      <Form className={classes.login_form} onSubmit={submitFormLogin}>
          <div></div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder={enteredUsername}
            onChange={setEnteredUsernameHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder={enteredPassword}
            onChange={setEnteredPasswordHandler}
          />
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Name"
            onChange={setEnteredNameHandler}
          />
        </Form.Group>
        <div>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateAccount;