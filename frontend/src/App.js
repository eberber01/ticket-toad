import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import LoginNavbar from "./components/LoginNavbar";
import LoggedIn from "./components/LoggedIn";
import CreateAccount from "./components/CreateAccount";

function App() {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [team, setTeam] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);

  const logoutHandler = () => {
    setUser(null);
  };

  const loginHandler = (username) => {
    setUser(username.name);
    setUserEmail(username.email);
    setTeam(username.team);
    setLoginPage(false);
  };

  const setLoginPageHandler = () => {
    setLoginPage(true);
    setCreateAccount(false);
  };

  const setCreateAccountHandler = () => {
    setCreateAccount(true);
  };

  const setTeamHandler = (teamId) => {
    setTeam(teamId);
  };

  //homepage
  if (!loginPage && user == null) {
    return (
      <div>
        <LoginNavbar login={setLoginPageHandler}></LoginNavbar>
        <HomePage></HomePage>
      </div>
    );
  }

  //login page
  if (loginPage && user == null && !createAccount) {
    return (
      <div>
        <LoginNavbar login={setLoginPageHandler}></LoginNavbar>
        <Login
          loginHandler={loginHandler}
          createAccount={setCreateAccountHandler}
        ></Login>
      </div>
    );
  }

  //Logged in
  if (user != null) {
    return (
      <div>
        <LoggedIn
          teamId={team}
          userName={user}
          userEmail={userEmail}
          logout={logoutHandler}
        />
      </div>
    );
  }

  if (createAccount) {
    return (
      <div>
        <LoginNavbar login={setLoginPageHandler}></LoginNavbar>
        <CreateAccount login={setLoginPageHandler}></CreateAccount>
      </div>
    );
  }
}

export default App;
