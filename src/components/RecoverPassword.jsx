import React, { useEffect, useState } from 'react'
import { FaAngleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import FormInput from '../commons/FormInput';
import FormButton from "../commons/FormButton";

const RecoverPassword = () => {
    const navigate = useNavigate();
  
    const [btnDisable, setBtnDisable] = useState(true);
    const [values, setValues] = useState({
      password: "",
      confirmPassword: "",
    });
  
    useEffect(() => {
      const checkFieldsAreNotEmpty = Object.values(values).every((x) => x !== "");
      checkFieldsAreNotEmpty ? setBtnDisable(false) : setBtnDisable(true);
    }, [values]);
  
    const inputs = [
      {
        name: "password",
        type: "password",
        placeholder: "Ingresa una nueva contraseña",
        errorMessage: "8-14 caracteres e incluir letras y números",
        //label: "Password",
        pattern: "^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,14}$",
        required: true,
      },
      {
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirme su nueva contraseña",
        errorMessage: "Las contraseñas deben coincidir",
        //label: "ConfirmPassword",
        pattern: values.password,
        required: true,
      },
    ];
  
    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/login");
    };
    return (
      <div className="signin">
        <form className={`form`} onSubmit={handleSubmit}>
          <h2 className="signin__title">Olvidaste tu contraseña?</h2>
          <h3 className="signin__subtitle">Nueva contraseña</h3>
          <div className="signin__validationCod">
            <div className="signin__validationCod--title">¿Qué es esto?</div>
            <span className="signin__validationCod--message">
              Permite acreditar su relación con Globant. Solicitelo a su
              responsable.
            </span>
          </div>
          {inputs.map((input, i) => (
            <FormInput
              key={i}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <FormButton type="submit" isDisabled={btnDisable}>
            Enviar <FaAngleRight />
          </FormButton>
        </form>
      </div>
    );
}

export default RecoverPassword
