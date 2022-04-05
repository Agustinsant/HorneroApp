import axios from "axios"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { FaAngleRight } from "react-icons/fa";
import swal from "sweetalert";

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

    swal({
      text: "Bienvenido!",
      icon: "success",
      timer: 2000,
      buttons:false
    }).then(() => navigate("/"));
  };

  const handleRecoverPassword = (e) => {
    e.preventDefault();
    console.log('peeeeeeeeeeeeee', values.email)
    if(values.email === ''){
      swal({
        text: "Verifique que su email sea el correcto!",
        icon: "error",
        // timer: 2000,
        buttons:true
      })
    }
    else { swal({
      text: "Para restablecer la contraseña, revise su email!",
      icon: "success",
      // timer: 2000,
      buttons:true
    })}

    axios.post(`http://localhost:3001/api/recover/${values.email}`)
      .then()
      .catch(err => console.log(err))
  }

  return (
    <div className="signin">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="signin__title">¡Bienvenido!</h2>
        <h3 className="signin__subtitle">Login</h3>
        <FormInput
          {...inputs[0]}
          value={values[inputs[0].name]}
          onChange={onChange}
        />
        <div  className="signin__validationCod">
            <div onClick={handleRecoverPassword} className="signin__validationCod--title">
              Recuperar contraseña
            </div>
        </div>
        <FormInput
          {...inputs[1]}
          value={values[inputs[1].name]}
          onChange={onChange}
        />

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
