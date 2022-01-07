import classes from "./UserCard.module.css";

export const UserCard = (props) => {
  return (
    <div className={classes.usercard_container}>
      <div className={classes.usercard_user}>{props.children}</div>
    </div>
  );
};
