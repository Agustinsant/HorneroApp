import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight, FaUserEdit } from "react-icons/fa";
import noPhoto from "../resources/img/noPhoto.webp";
import useInput from "../hooks/useInput";
import { persistUser } from "../store/user";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import axios from "axios";

const imgs = require.context("../storage/upload", true);

const MyProfile = ({ modalState, setModalState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const user = useSelector((state) => state.user.data);
  const token = localStorage.getItem("token");
  const isLogged = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, []);

  const send = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", file);
    const userEdited = await axios.post(
      `http://localhost:3001/api/user/updateUser/${user._id}`,
      data
    );
    dispatch(persistUser(token));
  };

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
          <img src={ imgs(`./${user.img}`) || noPhoto} />
          {//imgs(`./${user.img}`) ||
          }
        </div>
      </div>

      <h5>{user.name}</h5>
      <div className="profile_links">
        <div>
          <h4> Mis datos personales</h4>
          <Link className="link_arrows" to="/datos">
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
          <Link className="link_arrows" to="/amigos">
            <FaAngleRight />
          </Link>
        </div>
        <div>
          <h4> Mis reservas</h4>
          <Link className="link_arrows" to="/reservas">
            <FaAngleRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
