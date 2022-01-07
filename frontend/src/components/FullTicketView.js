import axios from "axios";
import react, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import classes from "./FullTicketView.module.css";
import { DeleteModal } from "./DeleteModal";

const FullTicketView = (props) => {
  const [ticketId, setTicketId] = useState(props._id);
  const [assigned, setAssigned] = useState("");
  const [editTicket, setEditTicket] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState();
  const [users, setUsers] = useState([]);
  const [storedTitle, setStoredTitle] = useState("");
  const [storedDescription, setStoredDescription] = useState("");
  const [storedAssigned, setStoredAssigned] = useState("");
  const [storedStatus, setStoredStatus] = useState("");
  const statusList = [
    "Active",
    "Ordered",
    "Delivered",
    "Deployed",
    "Pending",
    "Ordered",
    "Closed",
  ];

  console.log(ticketId);
  useEffect(() => {
    axios
      .post("http://localhost:4000/findTicket", {
        _id: ticketId,
      })
      .then((response) => {
        const ticket = response.data.tickets[0];
        setDescription(ticket.description);
        setTitle(ticket.title);
        setAssigned(ticket.assigned);
        setStatus(ticket.status);
        setStoredDescription(ticket.description);
        setStoredTitle(ticket.title);
        setStoredAssigned(ticket.assigned);
        setStoredStatus(ticket.status);
      });

    axios
      .post("http://localhost:4000/getTeamUsers", {
        email: props.userEmail,
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      });
  }, []);

  const setEditTicketHandler = () => {
    setEditTicket(true);
  };
  const cancelTicketChanges = () => {
    setTitle(storedTitle);
    setDescription(storedDescription);
    setAssigned(storedAssigned);
    setStatus(storedStatus);
    setEditTicket(false);
  };

  const closeViewTicket = () => {
    props.closeTicket();
  };

  const setTitleHandler = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setTitle(e.target.value);
  };

  const setDescriptionHandler = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const setAssignedHandler = (e) => {
    e.preventDefault();
    setAssigned(e.target.value);
  };

  const setStatusHandler = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
  };

  const updateTicket = () => {
    axios.post("http://localhost:4000/updateTicket", {
      _id: ticketId,
      title: title,
      description: description,
      status: status,
      assigned: assigned,
    });
    props.closeTicket();
  };

  return (
    <div>
      <div className={classes.ticket_title}>Ticket</div>
      <div className={classes.ticket_container}>
        {editTicket === false ? (
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title </Form.Label>
              <Form.Control readOnly value={title} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              readOnly
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                readOnly
                value={description}
              />
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Assigned</Form.Label>
                  <Form.Select defaultValue="">
                    <option>{assigned}</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group readOnly as={Col} controlId="formGridState">
                  <Form.Label readOnly>Status</Form.Label>
                  <Form.Select readOnly>
                    <option readOnly>{status}</option>
                  </Form.Select>
                </Form.Group>
              </Row>
            </Form.Group>
            <Button variant="success" onClick={setEditTicketHandler}>
              Edit Ticket
            </Button>
            <Button
              variant="secondary"
              style={{ marginLeft: "1%" }}
              onClick={closeViewTicket}
            >
              Back
            </Button>
          </Form>
        ) : (
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              onChange={setTitleHandler}
            >
              <Form.Label>Title</Form.Label>
              <Form.Control defaultValue={title} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={description}
                onChange={setDescriptionHandler}
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Assigned</Form.Label>
                <Form.Select onChange={setAssignedHandler}>
                  <option>{assigned}</option>
                  {users
                    .filter((prop) => {
                      if (prop !== assigned) {
                        return prop;
                      }
                    })
                    .map((user) => {
                      return <option>{user}</option>;
                    })}
                </Form.Select>
              </Form.Group>
              <Form.Group readOnly as={Col} controlId="formGridState">
                <Form.Label readOnly>Status</Form.Label>
                <Form.Select onChange={setStatusHandler}>
                  <option readOnly>{status}</option>
                  {statusList
                    .filter((list) => {
                      if (list !== status.trim()) {
                        return list;
                      }
                    })
                    .map((list) => {
                      return <option>{list}</option>;
                    })}
                </Form.Select>
              </Form.Group>
            </Row>
            <div className={classes.buttons}>
              <Button variant="secondary" onClick={cancelTicketChanges}>
                Cancel Changes
              </Button>
              <Button variant="success" onClick={updateTicket}>
                Submit Changes
              </Button>
              <DeleteModal
                ticketId={ticketId}
                closeTicket={closeViewTicket}
              ></DeleteModal>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};
//need to add database connection to write new changes to the ticket
export default FullTicketView;
