import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./store/user";

import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signin from "./components/Signin";
import MyProfile from "./components/MyProfile";

function App() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/mi_perfil" element={<MyProfile/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
