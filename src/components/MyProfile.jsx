import React from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import noPhoto from "../resources/img/noPhoto.webp";
import {useSelector, useDispatch } from 'react-redux'


const MyProfile = () => {

    const user = useSelector(state => state.user.data)


  return (
    <div className="profile_container">
      <h6>Mi Perfil</h6>
      <div className="profile_photo">
        <img src={user.img || noPhoto} />
      </div>
      <h5>{user.name}</h5>
      <div className="profile_links">
        <div>
          <h4> Mis datos personales</h4>
          <Link className="link_arrows" to="mi_perfil/datos">
            <FaAngleRight />
          </Link>
        </div>
        <div>
          <h4> Mis preferencias</h4>
          <Link className="link_arrows" to="mi_perfil/preferencias">
            <FaAngleRight />
          </Link>
        </div>
        <div>
          <h4> Mis amigos</h4>
          <Link className="link_arrows" to="mi_perfil/amigos">
            <FaAngleRight />
          </Link>
        </div>
        <div>
          <h4> Mis reservas</h4>
          <Link className="link_arrows" to="mi_perfil/reservas">
            <FaAngleRight  />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
