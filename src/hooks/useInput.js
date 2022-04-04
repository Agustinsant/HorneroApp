import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState('');
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { value, onChange, setValue};
};

export default useInput;
