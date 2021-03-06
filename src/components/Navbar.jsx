import logo from "../resources/img/logoNew.svg";
import '../styles/navbar.css'

import { useSelector, useDispatch } from "react-redux";
import { logOut, persistUser } from "../store/user";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import { FaBars } from "react-icons/fa";
import DarkMode from "./DarkMode";

const NavbarComponent = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const token = localStorage.getItem("token");
  const theme = localStorage.getItem("theme");

  useEffect(() => {
    if (!token) navigate("/login");
    else if (token) {
      dispatch(persistUser(token));
    }
  }, [token]);

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logOut());
    setOpenMenu(false);
    navigate("/");
    swal({
      text: "Deslogueo Exitoso!",
      icon: "success",
      timer: 1000,
      buttons: false,
    });
  };

  return (
    <nav>
      <div className="navContainer">
        <div className="navLogo">
          <Link onClick={() => setOpenMenu(false)} className="linksNav" to="/">
            <img src={logo} width="160px" />
          </Link>
        </div>

        <div className="navMenu">
          <DarkMode />
          {user.name && (
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="dropDownMenu"
            >
              <div className="navProfilePick">
                <img src={user.img}></img>
              </div>
            </button>
          )}

          <div
            className={
              openMenu ? "dropDownSubMenuOpen" : "dropDownSubMenuClosed"
            }
          >
            {user.name ? (
              <Link
                onClick={() => setOpenMenu(false)}
                className="linksNav"
                to="mi_perfil"
              >
                Mi Perfil
              </Link>
            ) : (
              <></>
            )}
            {user.name ? (
              <button className="logOutBtn" onClick={logoutUser}>
                Logout
              </button>
            ) : (
              <Link
                onClick={() => setOpenMenu(false)}
                className="linksNav"
                to="login"
              >
                Login
              </Link>
            )}
            {user.isAdmin && <Link
                onClick={() => setOpenMenu(false)}
                className="linksNav"
                to="adminPanel"
              >
                Admin Panel
              </Link> }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
