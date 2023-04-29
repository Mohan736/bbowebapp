import React from "react";

import "./card.css";

const Card = ({ children, className }) => {
  return <div className={`cardClassname ${className}`}>{children}</div>;
};

export default Card;
