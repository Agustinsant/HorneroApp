import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import logo from "../resources/img/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { logOut, persistUser } from "../store/user";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.user.isLogged);
  const user = useSelector((state) => state.user.data);
  const token = localStorage.getItem("token");

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logOut());
    navigate("/");
  };

  return (
    <nav>
      <div className="navContainer">
        <div className="navLogo">
          <Link className="linksNav" to="/">
            <img src={logo} width="160px" />
          </Link>
        </div>
        <div className="navMenu">
          {isLogged ? <Link className="linksNav" to="mi_perfil">Mi Perfil</Link> : <></>}
          {isLogged ? (
            <button className="logOutBtn" onClick={logoutUser}>Logout</button>
          ) : (
            <Link className="linksNav" to="login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
