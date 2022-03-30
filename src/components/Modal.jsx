import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { persistUser } from "../store/user";


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
    setModalState(!modalState)
    dispatch(persistUser(token));
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
