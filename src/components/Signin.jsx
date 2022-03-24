import { useState } from "react";
import useInput from "../hooks/useInput";
import { FaAngleRight } from "react-icons/fa";

import Form from "../commons/Form";
import Button from "../commons/Button";

function Signin() {
  ///Catch input states
  const validationCod = useInput();
  const fullName = useInput();
  const email = useInput();
  const password = useInput();
  ///Control button disabled
  const [btnDisabled, setBtnDisabled] = useState(false);
  ///messages for controled fields
  const [messageValidationCod, setMessageValidationCod] = useState("");
  const [messageFullname, setMessageFullname] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");

  const handleSubmit = () => {};

  ///control every field and dispatch a message
  const fieldsControl = () => {
    //validationCod: Conditions must be established
    //Alfanumerico 8 digitos SEEDEAR EN BASE!!!
    if (fullName) {
    }
  };

  return (
    <div className="signin">
      <Form onSubmit={handleSubmit}>
        <h2 className="signin__title">Nuevo por Aqui?</h2>
        <h3 className="signin__subtitle">Registro</h3>
        <div className="signin__validationCod">
          <div className="signin__validationCod--title">¿Qué es esto?</div>
          <spam className="signin__validationCod--message">
            Permite acreditar su relación con Globant. Solicitelo a su
            responsable.
          </spam>
        </div>
        <input
          type="text"
          {...validationCod}
          placeholder="Ingresa tu codigo de validación"
        />
        {messageValidationCod && (
          <div className="message">{messageValidationCod}</div>
        )}
        <input
          type="text"
          {...fullName}
          placeholder="Ingresa tu nombre completo"
        />
        <input type="text" {...email} placeholder="Ingresa un email" />
        <input type="password" {...password} placeholder="Contraseña" />

        <Button type="submit" isDisabled={btnDisabled}>
          Enviar <FaAngleRight />
        </Button>
      </Form>
    </div>
  );
}

export default Signin;
