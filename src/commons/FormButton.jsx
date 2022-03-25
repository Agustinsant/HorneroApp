import PropTypes from "prop-types";

function FormButton({ children, version, type, isDisabled }) {
  return (
    <button type={type} disabled={isDisabled} className={`btn`}>
      {children}
    </button>
  );
}

FormButton.defaultProps = {
  version: "primary",
  type: "button",
  isDisabled: false,
};

FormButton.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default FormButton;
