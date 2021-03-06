import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router";
import {Link} from 'react-router-dom'
import swal from "sweetalert";
import FormInput from "../commons/FormInput";
import FormButton from "../commons/FormButton";
import { signInUser } from "../store/user";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [btnDisable, setBtnDisable] = useState(true);
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const checkFieldsAreNotEmpty = Object.values(values).every((x) => x !== "");
    checkFieldsAreNotEmpty ? setBtnDisable(false) : setBtnDisable(true);
  }, [values]);

  const inputs = [
     {
      name: "fullname",
      type: "text",
      placeholder: "Ingresa tu nombre completo",
      errorMessage: "Debe ingresar su nombre y apellido",
      // label: "FullName",
      pattern:
        "^([a-zA-Z]+[',.-]?[a-zA-Z ]*)+[ ]([a-zA-Z]+[',.-]?[a-zA-Z ]+)+$",
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Ingresa un email",
      errorMessage: "Ingrese un email válido",
      //label: "",
      required: true,
    },
    {
      name: "city",
      type: "text",
      placeholder: "Ingrese ciudad de residencia",
      errorMessage: "Ingrese una residencia válida",
      //label: "ValidationCod",
      pattern: "^[a-zA-Z]+(([',.- ][a-zA-Z ])?[a-zA-Z]*)*$",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Ingresa una contraseña",
      errorMessage: "8-14 caracteres e incluir letras y números",
      //label: "Password",
      pattern: "^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,14}$",
      required: true,
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirme su contraseña",
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
      dispatch(
      signInUser({
        name: values.fullname,
        city: values.city,
        email: values.email,
        password: values.password,
      })
    ).then(data => {
      data.error ? (
        swal({
          text: "Ocurrió un error en el registro.",
          icon: "error",
          timer: 2000,
          buttons:false
        })
      )  :  (
        swal({
          text: "Registro exitoso!",
          icon: "success",
          timer: 2000,
          buttons:false
        }).then(() => navigate("/"))
      )
    });
   
  };
  return (
    <div className="signin">
      <form className={`form`} onSubmit={handleSubmit}>
        <h2 className="signin__title">¿Nuevo por Aquí?</h2>
        <h3 className="signin__subtitle">Registro</h3>
        <div className="signin__validationCod">
          
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
      <Link to='/login' className="goBackBtn"><FaAngleLeft className="link_arrows"/>Volver  </Link>

    </div>
  );
}

export default Signin;
