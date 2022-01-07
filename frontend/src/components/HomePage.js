import React from "react";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={classes.homepage_container}>
      <div >
        <div className={classes.homepage_logo}>Ticket Toad</div>
        <div className={classes.homepage_text}>Tasks Made Easy</div>
      </div>
    </div>
  );
};

export default HomePage;
