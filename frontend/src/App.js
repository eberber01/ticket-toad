import classes from  "./App.module.css";
import { Button, Row, Col, Navbar, Container, ButtonGroup } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import HomePage from "./components/HomePage"
import LoginNavbar from "./components/LoginNavbar"
import LoggedIn from "./components/LoggedIn";
import Footer from "./components/Footer";
import CreateAccount from "./components/CreateAccount";



function App() {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState("")
  const [team, setTeam] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  const [createAccount, setCreateAccount] = useState(false)



  const logoutHandler = () => {
    setUser(null);
  };

  const loginHandler = (username) => {
      
    setUser(username.name)
    setUserEmail(username.email)
    setTeam(username.team)
    setLoginPage(false)
          
        
      
  };

  const setLoginPageHandler = () => {
    setLoginPage(true);
    setCreateAccount(false)
  };

  const setCreateAccountHandler =()=>{

    setCreateAccount(true);
  }

  const setTeamHandler = (teamId) =>{
    setTeam(teamId)
  }



  //homepage
  if(!loginPage && user == null){ 
  return (
    <div className={classes.homepage}>
      <LoginNavbar login={setLoginPageHandler}></LoginNavbar>
      <HomePage></HomePage>
      <Footer/>
    </div>
  );
  } 



  //login page
  if(loginPage && user == null && !createAccount){
    return(
      <div>
        <LoginNavbar login={setLoginPageHandler}></LoginNavbar>
        <Login loginHandler={loginHandler} createAccount={setCreateAccountHandler}></Login>
      </div>
    )
  }


  //Logged in 
  if(user != null){
    return(
      <div>
        <LoggedIn teamId= {team} userName={user} userEmail={userEmail} logout={logoutHandler}/>
      </div>
    )
  }

  if(createAccount){
    return(
      <div>
        
        <LoginNavbar login={setLoginPageHandler}></LoginNavbar>
        <CreateAccount></CreateAccount>
      </div>
    )

  }
}

export default App;
