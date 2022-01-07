import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./AdminPage.module.css";
import { UserCard } from "./UserCard";
import { Nav, Col, Row, Tab, Form } from "react-bootstrap";

const AdminPage = (props) => {
  const [admin, setAdmin] = useState(props.userEmail);
  const [users, setUsers] = useState([]);
  const [usersPage, setUsersPage] = useState(true);
  const [accessCodePage, setAccessCodePage] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  const accessCodePageHandler = () => {
    setUsersPage(false);
    setAccessCodePage(true);
  };

  const usersPageHandler = () => {
    setUsersPage(true);
    setAccessCodePage(false);
  };

  useEffect(() => {
    axios
      .post("https://git.heroku.com/ticket-toad.git/getTeamUsers", {
        email: admin,
      })
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .post("https://git.heroku.com/ticket-toad.git/getAccessCode", {
        email: admin,
      })
      .then((response) => {
        setAccessCode(response.data);
      });
  }, []);

  if (usersPage) {
    return (
      <div>
        <div className={classes.adminpage_title}>Admin Page</div>
        <div className={classes.adminpage_container}>
          <div className={classes.adminpage_body}>
            <div className={classes.adminpage_content}>
            <div className={classes.adminpage_contenttitle}>Users</div>
              {users
                .filter((user) => {
                  if (user != admin) {
                    return user;
                  }
                })
                .map((user) => {
                  return <UserCard key={user}>{user}</UserCard>;
                })}
            </div>
            <div className={classes.adminpage_sidebar}>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={3}>
                    <Nav variant="tabs" className="flex-column">
                      <Nav.Item onClick={usersPageHandler}>
                        <Nav.Link eventKey="first">Users</Nav.Link>
                      </Nav.Item>
                      <Nav.Item onClick={accessCodePageHandler}>
                        <Nav.Link eventKey="second">Access Code</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first"></Tab.Pane>
                      <Tab.Pane eventKey="second"></Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (accessCodePage) {
    return (
      <div>
        <div className={classes.adminpage_title}>Admin Page</div>
        <div className={classes.adminpage_container}>
          <div className={classes.adminpage_body}>
            <div className={classes.adminpage_content}>
              <div className={classes.adminpage_contenttitle}>AccessCode</div>
              <div>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Only give this out to members of your Team
                  </Form.Label>
                  <Form.Control placeholder={accessCode} disabled />
                </Form.Group>
              </div>
            </div>
            <div className={classes.adminpage_sidebar}>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={3}>
                    <Nav variant="tabs" className="flex-column">
                      <Nav.Item onClick={usersPageHandler}>
                        <Nav.Link eventKey="first">Users</Nav.Link>
                      </Nav.Item>
                      <Nav.Item onClick={accessCodePageHandler}>
                        <Nav.Link eventKey="second">Access Code</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first"></Tab.Pane>
                      <Tab.Pane eventKey="second"></Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AdminPage;
