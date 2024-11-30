import classes from "./InputField.module.css";
import PropTypes from "prop-types";

const InputField = ({
  id,
  label,
  value,
  setInputText,
  subTextLabel,
  subTextValue,
  isDisabled,
}) => {
  const showSubText = () => {
    if (subTextLabel && subTextValue) {
      return (
        <div className={classes.subTextWrapper}>
          {subTextLabel} = {subTextValue}
        </div>
      );
    }
  };

  return (
    <div className={classes.container}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        data-testid={id}
        className={classes.inputField}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isDisabled}
        value={value}
      />
      {showSubText()}
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  setInputText: PropTypes.func,
  subTextLabel: PropTypes.string,
  subTextValue: PropTypes.number,
  isDisabled: PropTypes.bool,
  setFocus: PropTypes.bool,
};

export default InputField;
