import react, { useState } from "react";

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

const Login = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("Enter Email");
  const [enteredPassword, setEnteredPassword] = useState("Password");
  const [loginAlert, setLoginAlert] = useState(false);

  const submitFormLogin = () => {
    if (enteredPassword != "Password") {
      props.LoginHandler(enteredUsername);
    } else {
      setLoginAlert(true);
    }
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
    <Form onSubmit={submitFormLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder={enteredUsername}
          onChange={setEnteredUsernameHandler}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder={enteredPassword}
          onChange={setEnteredPasswordHandler}
        />
      </Form.Group>
      {loginAlert == true ? (
        <div>
          <Alert variant="danger">Cannot login</Alert>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </div>
      ) : (
        <Button variant="success" type="submit">
          Submit
        </Button>
      )}
    </Form>
  );
};

export default Login;
