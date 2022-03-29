import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { persistUser } from "./store/user";
import { getBuildings } from "./store/building";

import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signin from "./components/Signin";
import MyProfile from "./components/MyProfile";
import Selector from "./components/Selector";
import Calendar from "./components/Calendar";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(persistUser(token));
      dispatch(getBuildings());
    }
  }, [token]);

  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route
          path="/"
          element={user.isLogged ? <h2>Pantalla inicio</h2> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/mi_perfil" element={<MyProfile />} />
        <Route path="explore" element={<Selector />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
