import react, { useState } from "react";
import { InputGroup, Form, FormControl, Row, Col, Button } from "react-bootstrap";




const FullTicketView = (props) => {
    const [editTicket, setEditTicket] = useState(false);
    
    const setEditTicketHandler = () => {
        setEditTicket(true);
    }
    const cancelTicketChanges = () => {
        
        setEditTicket(false);
    }

    const ticketTitle = props.title
    const ticketDescription = props.description
/* ---------------------------- fix form edit bug --------------------------- */
  return (
    <div styles={{ padding: "5% 5%" }}>
        {editTicket == false ? (
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Ticket {props.id} </Form.Label>
          <Form.Control readOnly defaultValue={ticketTitle} />

        </Form.Group>
        <Form.Group className="mb-3" readOnly controlId="exampleForm.ControlTextarea1" >
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} readOnly defaultValue={ticketDescription}/>
        </Form.Group>
        <Button variant="success" onClick={setEditTicketHandler}>Edit Ticket</Button>
      </Form>
        ) : (
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Ticket {props.id} </Form.Label>
          <Form.Control defaultValue={props.title} />

        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} defaultValue={props.description} />
        </Form.Group>
        <Button variant="danger" onClick={cancelTicketChanges}>Cancel Changes</Button>
        <Button variant="success" style={{marginLeft: "2%"}} >Submit Changes</Button>
      </Form>
        )}
    </div>
  );
};
//need to add database connection to write new changes to the ticket
export default FullTicketView;
