import { useState } from "react";
import useInput from "../hooks/useInput";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

import Form from "../commons/Form";
import Button from "../commons/Button";

function Login() {
  ///Catch input states
  const email = useInput();
  const password = useInput();
  ///Control button disabled
  const [btnDisabled, setBtnDisabled] = useState(false);
  ///messages for controled fields
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");

  const handleSubmit = () => {};

  ///control every field and dispatch a message
  const fieldsControl = () => {
    if (email) {
    }
  };

  return (
    <div className="signin">
      <Form onSubmit={handleSubmit}>
        <h2 className="signin__title">¡Bienvenido!</h2>
        <h3 className="signin__subtitle">Login</h3>
        <div className="signin__validationCod">
          <Link to="/recover">
            <div className="signin__validationCod--title">
              Recuperar contraseña
            </div>
          </Link>
        </div>
        <input type="text" {...email} placeholder="Ingresa su email" />
        <input
          type="password"
          {...password}
          placeholder="Ingrese su contraseña"
        />
        <Button type="submit" isDisabled={btnDisabled}>
          Enviar <FaAngleRight />
        </Button>
        <br />
        or
        <Link to="/signin">
          Registrarme <FaAngleRight />
        </Link>
      </Form>
    </div>
  );
}

export default Login;
