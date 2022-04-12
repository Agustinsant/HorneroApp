import React, { useState } from "react";
import '../styles/misDatos.css'
import { useDispatch, useSelector } from "react-redux";
import { FaUserEdit, FaReply, FaAngleRight } from "react-icons/fa";
import { editUser, editUserPassword } from "../store/user";
import swal from "sweetalert";

import useInput from "../hooks/useInput";

const My_info = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const password = useInput();

  const [nameValue, setNameValue] = useState(user.name);
  const [emailValue, setEmailValue] = useState(user.email);
  const [cityValue, setCityValue] = useState(user.city);

  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [cityEdit, setCityEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editUser({
        id: user._id,
        name: nameValue,
      })
    ).then(data => {
      data.error ? swal({
        text: "Error al editar Nombre, colocar nombre completo!",
        icon: "error",
        buttons:true
      }) : swal({
        text: "Nombre modificado con éxito!",
        icon: "success",
        timer: 1000,
        buttons:false
      }).then(() => setNameEdit(!nameEdit))
    })
  };
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editUser({
        id: user._id,
        email: emailValue,
      })
    ).then(data => {
      data.error ? swal({
        text: "Error al editar Email, colocar un email valido!",
        icon: "error",
        buttons:true
      }) : swal({
        text: "Email modificado con éxito!",
        icon: "success",
        timer: 1000,
        buttons:false
      }).then(() => setEmailEdit(!emailEdit));
    })
  };
  const handleCitySubmit = (e) => {
    e.preventDefault();
    dispatch(
      editUser({
        id: user._id,
        city: cityValue,
      })
    ).then(data => {
      data.error ? swal({
        text: "Error al editar Ciudad, verifique que el campo este completo!",
        icon: "error",
        buttons:true
      }) : swal({
        text: "Ciudad modificada con éxito!",
        icon: "success",
        timer: 1000,
        buttons:false
      }).then(() => setCityEdit(!cityEdit));
    })
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editUserPassword({
        id: user._id,
        password: password.value,
      })
    ).then(data => {
      data.error ? (
       swal({
        text: "Error al editar Contraseña. 8-14 caracteres e incluir letras y números!",
        icon: "error",
        buttons:true
       })
      ) : (
       swal({
        text: "Contraseña modificada con éxito!",
        icon: "success",
        timer: 1000,
        buttons:false
       }).then(() => setPasswordEdit(!passwordEdit))
      )
    })
    
  };

  return (
    <div className="misDatosContainer">
      <h6>Mis Datos</h6>
      <form onSubmit={handleNameSubmit}>
        <div className="editInputsContainer">
          {nameEdit ? (
            <>
            <p className="misDatosLabel">Nombre y Apellido</p>
            <input
              onChange={e=>setNameValue(e.target.value)}
              value={nameValue}
              type="text"
              disabled={!nameEdit}
              pattern= "^[A-Z]([a-zA-Z]+[',.-]?[a-zA-Z ]*)+[A-Z]([a-zA-Z]+[',.-]?[a-zA-Z ]+)+$"
              focused="true"
              
            />
            <span className="form__input--errormessage"> Respeta Mayúsculas! (ej: Juan Topo)</span>
            </>
          ) : (
            <>
            <p className="misDatosLabel">Nombre y Apellido</p>
            <h5>{user?.name}</h5>
            </>
          )}
        </div>
        <div className="editBtnsContainer">
          {nameEdit ? (
            <button
              className="misDatosBtns"
              onClick={(e) => {
                e.preventDefault();
                setNameEdit(!nameEdit);
              }}
            >
              <FaReply className="cancelEditIcon" />
            </button>
          ) : (
            <button
              className="misDatosBtns"
              onClick={(e) => {
                e.preventDefault();
                setNameEdit(!nameEdit);
              }}
            >
              <FaUserEdit className="editInfoIcon" />
            </button>
          )}
          {nameEdit && (
            <button className="misDatosBtns" type="submit">
              <FaAngleRight className="submitInfoIcon" />
            </button>
          )}
        </div>
      </form>
      {!nameEdit ? (
        <hr className="hrDatos"></hr>
      ) : (
        <hr className="hrInvisible"></hr>
      )}
      <form onSubmit={handleEmailSubmit}>
        <div className="editInputsContainer">
          {emailEdit ? (
            <>
            <p className="misDatosLabel">E-mail</p>
            <input
              onChange={e=>setEmailValue(e.target.value)}
              value={emailValue}
              type="text"
              disabled={!emailEdit}
              pattern= "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
              focused="true"
              />
              <span className="form__input--errormessage"> Ingresa un email valido! (ejemplo@mail.com) </span>
              </>
          ) : (
            <>
            <p className="misDatosLabel">E-mail</p>
            <h5>{user?.email}</h5>
            </>
          )}
        </div>
        <div className="editBtnsContainer">
          {emailEdit ? (
            <button
              className="misDatosBtns"
              onClick={(e) => {
                e.preventDefault();
                setEmailEdit(!emailEdit);
              }}
            >
              <FaReply className="cancelEditIcon" />
            </button>
          ) : (
            <button
              className="misDatosBtns"
              onClick={(e) => {
                e.preventDefault();
                setEmailEdit(!emailEdit);
              }}
            >
              <FaUserEdit className="editInfoIcon" />
            </button>
          )}
          {emailEdit && (
            <button className="misDatosBtns" type="submit">
              <FaAngleRight className="submitInfoIcon" />
            </button>
          )}
        </div>
      </form>
      {!emailEdit ? (
        <hr className="hrDatos"></hr>
      ) : (
        <hr className="hrInvisible"></hr>
      )}
      <form onSubmit={handleCitySubmit}>
        <div className="editInputsContainer">
          {cityEdit ? (
            <>
            <p className="misDatosLabel">Ciudad</p>
            <input
              onChange={e=>setCityValue(e.target.value)}
              value={cityValue}
              type="text"
              disabled={!cityEdit}
              pattern= "^.{4,26}$"
              focused="true"
              />
            <span className="form__input--errormessage"> 4-26 caracteres</span>
              </>
          ) : (
            <>
            <p className="misDatosLabel">Ciudad</p>
            <h5>{user?.city}</h5>
            </>
          )}
        </div>
        <div className="editBtnsContainer">
          {cityEdit ? (
            <button
              className="misDatosBtns"
              onClick={(e) => {
                e.preventDefault();
                setCityEdit(!cityEdit);
              }}
            >
              <FaReply className="cancelEditIcon" />
            </button>
          ) : (
            <button
              className="misDatosBtns"
              onClick={(e) => {
                e.preventDefault();
                setCityEdit(!cityEdit);
              }}
            >
              <FaUserEdit className="editInfoIcon" />
            </button>
          )}
          {cityEdit && (
            <button className="misDatosBtns" type="submit">
              <FaAngleRight className="submitInfoIcon" />
            </button>
          )}
        </div>
      </form>
      {!cityEdit ? (
        <hr className="hrDatos"></hr>
      ) : (
        <hr className="hrInvisible"></hr>
      )}
      <form onSubmit={handlePasswordSubmit}>
        <div className="editInputsContainer">
          {passwordEdit ? (
            <>
            <p className="misDatosLabel">Password</p>
            <input
              {...password}
              type="password"
              placeholder="Insertar nueva contraseña."
              disabled={!passwordEdit}
              pattern= "^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,14}$"
              focused="true"
              />
            <span className="form__input--errormessage"> 8-14 caracteres e incluir letras y números! </span>
              </>
          ) : (
            <>
            <p className="misDatosLabel">Password</p>
            <h5>**********</h5>
            </>
            )}
          
        </div>
        <div className="editBtnsContainer">
          {passwordEdit ? (
            <button
              className="misDatosBtns"
              onClick={(e) => {
                e.preventDefault();
                setPasswordEdit(!passwordEdit);
              }}
            >
              <FaReply className="cancelEditIcon" />
            </button>
          ) : (
            <button
            className="misDatosBtns"
            onClick={(e) => {
              e.preventDefault();
              setPasswordEdit(!passwordEdit);
            }}
            >
              <FaUserEdit className="editInfoIcon" />
            </button>
          )}
          {passwordEdit && (
            <button className="misDatosBtns" type="submit">
              <FaAngleRight className="submitInfoIcon" />
            </button>
          )}
        </div>
      </form>
      {!passwordEdit ? (
        <hr className="hrDatos"></hr>
      ) : (
        <hr className="hrInvisible"></hr>
      )}
    </div>
  );
};

export default My_info;
