import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { persistUser } from "./store/user";

import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signin from "./components/Signin";
import MyProfile from "./components/MyProfile";
import Floors from "./components/Floors";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) dispatch(persistUser(token));
  }, [token]);

  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={user.isLogged ? <h2>Pantalla inicio</h2> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/mi_perfil" element={<MyProfile />} />
        <Route path="building/floor" element={<Floors />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
