import PropTypes from "prop-types";

function Form({ children }) {
  return <form className={`form`}>{children}</form>;
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Form;
