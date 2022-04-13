import React, { useState } from "react";
import '../styles/imgModal.css'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { persistUser } from "../store/user";
import swal from "sweetalert";

const Modal = ({modalState, setModalState}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const token = localStorage.getItem('token')
  const [file, setFile] = useState();
  
  const send = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", file);
    const userEdited = await axios.post(
      `http://localhost:3001/api/user/updateUser/${user._id}`,
      data
    );
    
    dispatch(persistUser(token));
    swal({
      text: "Imagen editada con éxito!",
      icon: "success",
      timer: 1000,
      buttons:false
    }).then(() => setModalState(!modalState));
  };
  return (
    <>
      {modalState && 
        <div className="overlay">
          <div className="modalContainer">
            <form action="#">
               <label className="loadImageBtn">
                   Cargar nueva imagen
              <input
                type="file"
                name="image"
                accept=".jpg"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setFile(file);
                }}
              />
                   </label> 
            </form>
            <button className="modalSendBtn" onClick={send}>Enviar</button>
            <button className='modalCancelBtn'onClick={()=> setModalState(false)} >Cancelar</button>
          </div>
        </div>
      }
    </>
  );
};

export default Modal;
