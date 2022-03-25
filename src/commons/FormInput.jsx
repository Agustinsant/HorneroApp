import { useState } from "react";

function FormInput({ errorMessage, onChange, ...inputProps }) {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="form__input">
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => {
          inputProps.name === "confirmPassword" && setFocused(true);
        }}
        focused={focused.toString()}
      />
      <span className="form__input--errormessage">{errorMessage}</span>
    </div>
  );
}

export default FormInput;
