import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Form, Button } from "react-bootstrap";
import classes from "./CreateTicket.module.css";

const CreateTicket = (props) => {

    const [ticketTitle, setTicketTitle] = useState("")
    const [ticketDescription, setTicketDescription] = useState("");
    const [ticketAssigned, setTicketAssigned] = useState(props.userEmail);
    const [ users, setUsers] = useState([])
    const [ticketStatus, setTicketStatus] = useState("Active");


    useEffect(()=>{
      axios.post("https://git.heroku.com/ticket-toad.git/getTeamUsers",{
        email: props.userEmail
      }).then((response)=>{
        console.log(response.data)
          setUsers(response.data)
      })
    },[])


   const setTicketTitleHandler = (e) => {
        e.preventDefault();
        setTicketTitle(e.target.value);
    }

    const setTicketDescriptionHandler = (e) => {
        e.preventDefault();
        setTicketDescription(e.target.value);
    }

    const setTicketAssignedHandler = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setTicketAssigned(e.target.value);
    }

    const setTicketStatusHandler = (e) => {
        e.preventDefault();
        setTicketStatus(e.target.value);
    }

    
    

  const createTicketHandler = () => {
      console.log("ticket created")
      console.log(ticketStatus)
    axios.post("https://git.heroku.com/ticket-toad.git/createNewTicket", {
      email: props.userEmail,
      ticketID: "0002",
      title: ticketTitle, 
      description: ticketDescription,
      creator: props.userEmail,
      assigned: ticketAssigned,
      status: ticketStatus,
    });
    
    props.setTicketContainer();
    
  
  };

  return (
    <div className={classes.create_container}>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="Enter Title" value={ticketTitle} onChange={setTicketTitleHandler}/>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter Description" value={ticketDescription} onChange={setTicketDescriptionHandler}/>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Assign To</Form.Label>
            <Form.Select defaultValue={props.loggedInUser} onChange={setTicketAssignedHandler} >
              <option>{props.userEmail}</option>
              {users.filter((user)=>{
                if(user != props.userEmail){
                  return user
                }
              }).map((user)=>{
                  return(<option>{user}</option>)
              }
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Status</Form.Label>
            <Form.Select defaultValue={ticketStatus} onChange={setTicketStatusHandler}>
              <option>Active</option>
              <option>Ordered</option>
              <option>Delivered</option>
              <option>Deployed</option>
              <option>Pending</option>
              <option>Closed</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Button variant="success" type="submit" onClick={createTicketHandler}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateTicket;
