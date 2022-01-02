import axios from "axios";
import react, { useState, useEffect } from "react";
import {
  InputGroup,
  Form,
  FormControl,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import classes from "./FullTicketView.module.css";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";

function Example(props) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteTicketHandler = () => {
    axios.post("http://localhost:4000/deleteTicket", {
      _id: props.ticketId,
    });
    props.closeTicket();
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want delete this ticket? </Modal.Title>
        </Modal.Header>
        <Modal.Body>You will not be able to recover the data.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={deleteTicketHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
const FullTicketView = (props) => {
  const [ticketId, setTicketId] = useState(props._id);
  const [assigned, setAssigned] = useState("");
  const [editTicket, setEditTicket] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ticketNumber, setTicketNumber] = useState();
  const [status, setStatus] = useState();
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [statusList, setStatusList] = useState([
    "Active",
    "Ordered",
    "Delivered",
    "Deployed",
    "Pending",
    "Ordered",
    "Closed",
  ]);
  console.log(ticketId)
  useEffect(() => {
    axios
      .post("http://localhost:4000/findTicket", {
        _id: ticketId,
      })
      .then((response) => {
        console.log(response.data);
        setDescription(response.data.tickets[0].description);
        setTitle(response.data.tickets[0].title);
        setAssigned(response.data.tickets[0].assigned);
        setStatus(response.data.tickets[0].status);
        setTicketNumber(response.data.ticketID);
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
    console.log("pog");
    setTitle(props.title);
    setDescription(props.description);
    console.log(title);

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

  /* ---------------------------- fix form edit bug --------------------------- */
  return (
    <div>
      <div className={classes.ticket_title}>Ticket #{ticketNumber}</div>
      <div className={classes.ticket_container}>
        {editTicket == false ? (
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
              <Form.Label>Ticket {props.id} </Form.Label>
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
                      if (prop != assigned) {
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
                      if (list != status.trim()) {
                        return list;
                      }
                    })
                    .map((list) => {
                      return <option>{list}</option>;
                    })}
                </Form.Select>
              </Form.Group>
            </Row>
            <Button variant="secondary" onClick={cancelTicketChanges}>
              Cancel Changes
            </Button>
            <Button
              variant="success"
              style={{ marginLeft: "1%" }}
              onClick={updateTicket}
            >
              Submit Changes
            </Button>
            <Example
              ticketId={ticketId}
              closeTicket={closeViewTicket}
            ></Example>
          </Form>
        )}
      </div>
      <div>
        <div>Comments</div>
        <div className={classes.ticket_container}>
          {comments.map((comment) => {
            return <Comment title="pog" description="pog"></Comment>;
          })}
          <CommentForm userEmail={props.userEmail} ticketId={ticketId}></CommentForm>
        </div>
      </div>
    </div>
  );
};
//need to add database connection to write new changes to the ticket
export default FullTicketView;
