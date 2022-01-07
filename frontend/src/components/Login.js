import { useState } from "react";
import classes from "./Login.module.css";
import { Button, Form, Alert } from "react-bootstrap";
import "react-bootstrap";
import axios from "axios";

const Login = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("Enter Email");
  const [enteredPassword, setEnteredPassword] = useState("Password");
  const [loginAlert, setLoginAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const submitFormLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://git.heroku.com/ticket-toad.git/login", {
        email: enteredUsername,
        password: enteredPassword,
      })
      .then((response) => {
        if (response.data.email) {
          props.loginHandler(response.data);
        }
        if (response.data.login === false) {
          setLoginAlert(true);
          setAlertText(response.data.message);
        }
      });
  };

  const setEnteredUsernameHandler = (event) => {
    event.preventDefault();
    setEnteredUsername(event.target.value);
  };

  const setEnteredPasswordHandler = (event) => {
    event.preventDefault();
    setEnteredPassword(event.target.value);
  };

  return (
    <div className={classes.login_container}>
      <Form className={classes.login_form} onSubmit={submitFormLogin}>
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
        {loginAlert ? <Alert variant="danger">{alertText}</Alert> : <div></div>}
        <div>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </div>

        <Form.Text className="text-muted">
          Not a user ?
          <p
            className={classes.createaccount_link}
            onClick={props.createAccount}
          >
            Create an account
          </p>
        </Form.Text>
      </Form>
    </div>
  );
};

export default Login;
