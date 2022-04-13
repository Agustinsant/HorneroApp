import React, { useEffect, useState } from "react";
import '../styles/miPerfil.css'
import { Link } from "react-router-dom";
import { FaAngleRight, FaUserEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import noPhoto from '../resources/img/noPhoto.webp'



const MyProfile = ({ modalState, setModalState }) => {
  
  
  
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.user.data);
  const isLogged = useSelector((state) => state.user);
  

  useEffect(() => {
    if (!user || !isLogged) navigate("/login");
   
  }, [isLogged]);

  return (
    <div className="profile_container">
      <h6>Mi Perfil</h6>
      <div className="profilePhotoContainer">
        <button
          className="editProfilePhotoBtn"
          onClick={() => setModalState(true)}
        >
          <FaUserEdit className="editPhotoIcon" />
        </button>
        <div className="profile_photo">
          <img src={user.img} />
        </div>
      </div>

      <h5>{user.name}</h5>
      <div className="profile_links">
        <div>
          <h4> Mis datos personales</h4>
          <Link className="link_arrows" to="/mi_perfil/mis_datos">
            <FaAngleRight />
          </Link>
        </div>
        <div>
          <h4> Mis preferencias</h4>
          <Link className="link_arrows" to="/preferencias">
            <FaAngleRight />
          </Link>
        </div>
        <div>
          <h4> Mis amigos</h4>
          <Link className="link_arrows" to="/mi_perfil/mis_amigos">
            <FaAngleRight />
          </Link>
        </div>
        <div>
          <h4> Mis reservas</h4>
          <Link className="link_arrows" to={`/reservas/${user._id}`}>
            <FaAngleRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
