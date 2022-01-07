import { Badge } from "react-bootstrap";

import React from "react";

const StatusBadge = (props) => {
  let badgeColor;
  const status = props.children.trim();

  if (status === "Active") {
    badgeColor = "success";
  }

  if (status === "Ordered") {
    badgeColor = "primary";
  }
  if (status === "Delivered") {
    badgeColor = "info";
  }
  if (status === "Deployed") {
    badgeColor = "warning";
  }
  if (status === "Closed") {
    badgeColor = "danger";
  }
  if (status === "Pending") {
    badgeColor = "dark";
  }

  return (
    <div>
      <Badge bg={badgeColor}>{status}</Badge>
    </div>
  );
};

export default StatusBadge;
