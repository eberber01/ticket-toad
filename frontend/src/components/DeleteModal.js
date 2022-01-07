import React, { useState, useEffect} from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

export const DeleteModal = (props) => {
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
    <div>
      <Button
        style={{ marginLeft: "1%" }}
        variant="danger"
        onClick={handleShow}
      >
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
    </div>
  );
};
