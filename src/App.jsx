import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { persistUser } from "./store/user";
import { getBuildings, getClosestBildings } from "./store/building";

import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signin from "./components/Signin";
import MyProfile from "./components/MyProfile";
import Welcome from "./components/Welcome";
import Modal from "./components/Modal";
import Selector from "./components/Selector";
import My_friends from "./components/My_friends";
import My_info from "./components/My_info";
import Booking from "./commons/Bookings";
import AddParticipants from "./components/AddParticipants";
import AdminReport from "./components/AdminRep";
import My_preferences from "./components/My_preferences";
import getGeoLocation from "./utils/getGeoLocation";


const App = ({ userUbication }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);
  const user = useSelector((state) => state.user.data);
  const token = localStorage.getItem("token");
  
  const [modalState, setModalState] = useState(false);
  
  useEffect(() => {
    if (!token) navigate("/login");
    else if (token) {
      dispatch(persistUser(token));
      dispatch(getBuildings())
      dispatch(getClosestBildings(userUbication))
    }
  }, [token]);

  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={user?._id ? <Welcome /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/mi_perfil"
          element={
            <MyProfile modalState={modalState} setModalState={setModalState} />
          }
        />
        <Route path="/mi_perfil/mis_amigos" element={<My_friends />} />
        <Route path="/preferencias" element={<My_preferences />} />
        <Route
          path="/reservas/:userId"
          element={isLogged ? <Booking/> : <Login />}
        />
        <Route path="/mi_perfil/mis_datos" element={<My_info />} />
        <Route path="/explore" element={<Selector />} />
        <Route path="/addParticipants" element={<AddParticipants />} />
        <Route path="/adminPanel" element={<AdminReport/>}/>
      </Routes>
      <Footer />
      <Modal modalState={modalState} setModalState={setModalState} />
    </div>
  );
};

export default App;
