import React from "react";
import PropTypes from "prop-types";
import "./MainHeader.css";

const MainHeader = (props) => {
  return <header className="main-header">{props.children}</header>;
};

MainHeader.propTypes = {
  children: PropTypes.arrayOf().isRequired,
};

export default MainHeader;
