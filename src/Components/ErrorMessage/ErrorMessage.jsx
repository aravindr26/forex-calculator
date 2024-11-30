import classes from "./ErrorMessage.module.css";
import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => {
  return message && <div className={classes.errorContainer}>{message}</div>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
