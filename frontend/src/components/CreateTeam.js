import axios from "axios";
import react, { useState } from "react";
import { Button, Modal, Card, Alert, Form } from "react-bootstrap";
import classes from "./CreateTeam.module.css";
function CreateTeam(props) {
  const [show, setShow] = useState(true);
  const [teamName, setTeamName] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setTeamNameHandler = (e) => {
    
      e.preventDefault()
      setTeamName(e.target.value)
    
  }

  const createTeamHandler= ()=>{
      axios.post("http://localhost:4000/createTeam",{
        email: props.userEmail,
        team: teamName
      }).then((response)=>{
          console.log(response)
      })
  }

  return (
    <div className={classes.createteam_container}>
      <Alert variant="secondary">
        You are not apart of a team. What would you like to do?
      </Alert>
      <Card>
        <Card.Body>
          <Card.Title>Create Team</Card.Title>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Team Name</Form.Label>
              <Form.Control placeholder="Enter Name" value={teamName} onChange={setTeamNameHandler} />
            </Form.Group>
            <Button variant="success" type="submit" onClick={createTeamHandler}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Join an existing team</Card.Title>

          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Access Code</Form.Label>
              <Form.Control placeholder="Enter Code" onChange={setTeamNameHandler} />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CreateTeam;
