import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { persistUser } from "./store/user";

import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signin from "./components/Signin";
import MyProfile from "./components/MyProfile";

import Floors from "./components/Floor";
import Modal from "./components/Modal";

import Selector from "./components/Selector";
import Calendar from "./components/Calendar";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);
  const isLogged = useSelector((state) => state.user.isLogged);
  const token = localStorage.getItem("token");

  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    if (token) return dispatch(persistUser(token));
    navigate("/login");
  }, [token]);

  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route
          path="/"
          element={isLogged ? <h2>Hola {user.name}</h2> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/mi_perfil"
          element={
            <MyProfile modalState={modalState} setModalState={setModalState} />
          }
        />
        <Route path="building/floor" element={<Floors />} />

        <Route path="explore" element={user.isLogged ? "401" : <Selector />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      <Footer />
      <Modal modalState={modalState} setModalState={setModalState} />
    </div>
  );
};

export default App;
