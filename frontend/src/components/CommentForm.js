import axios from "axios";
import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export const CommentForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
    
  console.log(props.ticketId);

  const setTitleHandler = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
    console.log(title);
  };

  const setDescriptionHandler = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const createComment = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/createComment", {
      ticketId: props.ticketId,
      title: title,
      description: description,
      user: props.userEmail,
    });
  };

  return (
    <div>
      <Form onSubmit={createComment}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Enter Title"
              onChange={setTitleHandler}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Enter Description"
            onChange={setDescriptionHandler}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Add Comment
        </Button>
      </Form>
    </div>
  );
};
