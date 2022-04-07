import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserEdit, FaReply, FaAngleRight } from "react-icons/fa";
import { editUser, editUserPassword } from "../store/user";
import swal from "sweetalert";

import useInput from "../hooks/useInput";

const My_info = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const name = useInput();
  const email = useInput();
  const city = useInput();
  const password = useInput();

  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [cityEdit, setCityEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editUser({
        id: user._id,
        name: name.value,
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
        email: email.value,
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
        city: city.value,
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
            <input
              {...name}
              type="text"
              placeholder="Editar nombre y apellido."
              disabled={!nameEdit}
            />
          ) : (
            <h5>{user?.name}</h5>
          )}
        </div>
        <div className="editBtnsContainer">
          {nameEdit ? (
            <button
              className="misDatosBtns"
              onClick={(e) => {
                e.preventDefault();
                name.setValue("");
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
      <hr className="hrDatos"></hr>
      <form onSubmit={handleEmailSubmit}>
        <div className="editInputsContainer">
          {emailEdit ? (
            <input
              {...email}
              type="text"
              placeholder="Editar email."
              disabled={!emailEdit}
            />
          ) : (
            <h5>{user?.email}</h5>
          )}
        </div>
        <div className="editBtnsContainer">
          {emailEdit ? (
            <button
              className="misDatosBtns"
              onClick={(e) => {
                e.preventDefault();
                name.setValue("");
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
      <hr className="hrDatos"></hr>
      <form onSubmit={handleCitySubmit}>
        <div className="editInputsContainer">
          {cityEdit ? (
            <input
              {...city}
              type="text"
              placeholder="Editar ciudad."
              disabled={!cityEdit}
            />
          ) : (
            <h5>{user?.city}</h5>
          )}
        </div>
        <div className="editBtnsContainer">
          {cityEdit ? (
            <button
              className="misDatosBtns"
              onClick={(e) => {
                e.preventDefault();
                name.setValue("");
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
      <hr className="hrDatos"></hr>
      <form onSubmit={handlePasswordSubmit}>
        <div className="editInputsContainer">
          {passwordEdit ? (
            <input
              {...password}
              type="password"
              placeholder="Editar contraseña."
              disabled={!passwordEdit}
            />
          ) : (
            <h5>**********</h5>
          )}
        </div>
        <div className="editBtnsContainer">
          {passwordEdit ? (
            <button
              className="misDatosBtns"
              onClick={(e) => {
                e.preventDefault();
                name.setValue("");
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
      <hr className="hrDatos"></hr>
    </div>
  );
};

export default My_info;
