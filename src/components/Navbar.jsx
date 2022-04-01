import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import logo from "../resources/img/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { logOut, persistUser } from "../store/user";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';




import { FaBars } from "react-icons/fa";

const imgs = require.context("../storage/upload", true);

const NavbarComponent = () => {

  
  const [openMenu, setOpenMenu] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.user.isLogged);
  const user = useSelector((state) => state.user.data);
  const token = localStorage.getItem("token");

  const imgProfile = imgs(`./${user?.img || 'nophoto.jpg' }`)

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logOut());
    setOpenMenu(false)

    swal({
      text: "Deslogueo Exitoso!",
      icon: "success",
      timer: 2000
    }).then(()=> navigate("/"))
    
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
          {isLogged && <div className="navProfilePick">
            <img src={imgProfile}></img>
          </div> }
          

          <button onClick={() => setOpenMenu(!openMenu)} className="dropDownMenu">
            <FaBars className="dropDownMenuIcon" />
          </button>

          <div className={ openMenu ? 'dropDownSubMenuOpen' : 'dropDownSubMenuClosed' }>
            {isLogged ? (
              <Link onClick={() => setOpenMenu(false)} className="linksNav" to="mi_perfil">
                Mi Perfil
              </Link>
            ) : (
              <></>
            )}
            {isLogged ? (
              <button className="logOutBtn" onClick={logoutUser}>
                Logout
              </button>
            ) : (
              <Link onClick={() => setOpenMenu(false)} className="linksNav" to="login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
