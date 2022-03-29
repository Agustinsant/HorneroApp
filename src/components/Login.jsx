import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { FaAngleRight } from "react-icons/fa";

import { userLogin } from "../store/user";
import FormInput from "../commons/FormInput";
import FormButton from "../commons/FormButton";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [btnDisabled, setBtnDisabled] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const checkFieldsAreNotEmpty = Object.values(values).every((x) => x !== "");
    checkFieldsAreNotEmpty ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [values]);

  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Ingresa un email",
      errorMessage: "Ingrese un email valido!",
      //label: "",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Ingresa una contraseña",
      errorMessage: "8-14 caracteres e incluir letras y números!",
      //label: "Password",
      pattern: "^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,14}$",
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      userLogin({
        email: values.email,
        password: values.password,
      })
    );
    navigate('/')
  };

  return (
    <div className="signin">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="signin__title">¡Bienvenido!</h2>
        <h3 className="signin__subtitle">Login</h3>
        <div className="signin__validationCod">
          <Link to="/recover">
            <div className="signin__validationCod--title">
              Recuperar contraseña
            </div>
          </Link>
        </div>
        {inputs.map((input, i) => (
          <FormInput
            key={i}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <FormButton type="submit" isDisabled={btnDisabled}>
          Ingresar <FaAngleRight />
        </FormButton>
        <hr></hr>
        <Link to="/signin">Registrarme</Link>
      </form>
    </div>
  );
}

export default Login;
