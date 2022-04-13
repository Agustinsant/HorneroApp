import React, { useEffect, useState } from "react"
import { BsFillCheckSquareFill, BsFillSquareFill } from "react-icons/bs"
import { FaAngleLeft } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { toogleCheck } from "../store/user"

import "../styles/booking.css";
const horneroImg = require("../assets/hornero.png");

const My_preferences = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.data)
  const isLogged = useSelector((state) => state.user)
  const closestBuildings = useSelector(
    (state) => state.buildings.closetsBuilding
  )

  const [checkMe, setCheckMe] = useState()
  const [checkFriend, setCheckFriend] = useState(user.emailFriendsReserve)
  const [checkGroup, setCheckGroup] = useState(user.emailGroupReserve)

  useEffect(() => {
    setCheckMe(user.emailMyReserve)
    setCheckFriend(user.emailFriendsReserve)
    setCheckGroup(user.emailGroupReserve)
  }, [user])

  useEffect(() => {
    if (!user || !isLogged) navigate("/login")
  }, [isLogged])

  const handleCheckMe = (e) => {
    e.preventDefault()
    dispatch(toogleCheck({ id: user._id, type: "emailMyReserve" })).then(() =>
      setCheckMe(!checkMe)
    )
  }

  const handleCheckFriend = (e) => {
    e.preventDefault()
    dispatch(toogleCheck({ id: user._id, type: "emailFriendsReserve" })).then(
      () => {
        setCheckFriend(!checkFriend)
      }
    )
  }

  const handleCheckGroup = (e) => {
    e.preventDefault()
    dispatch(toogleCheck({ id: user._id, type: "emailGroupReserve" })).then(
      () => {
        setCheckGroup(!checkGroup)
      }
    )
  }

  return (
    <div className="profile_container">
      <h6>Mis Preferencias</h6>
      { closestBuildings[0] ? (
      <div className="profile_links">
          <h5>Edificio más cercano en {closestBuildings[0].city}</h5>
        <div>
            <iframe
              src={`https://maps.google.com/?ll=${closestBuildings[0]["latitude"]},${closestBuildings[0]["longitude"]}&z=13&t=m&output=embed`}
              height="300"
              width="400"
              frameBorder="0"
              allowFullScreen
            ></iframe>
        </div>
      </div>
        ) : (
          <div className="deskCanFly">
            <img src={horneroImg} alt="loading" />
          </div>
        ) }

      <div className="profile_links">
        <h5>Notificaciones vía email</h5>
        <div>
          <h4>Mi reserva</h4>
          <div onClick={handleCheckMe} className="link_check">
            {checkMe ? (
              <BsFillCheckSquareFill />
            ) : (
              <>
                <BsFillSquareFill />
              </>
            )}
          </div>
        </div>
        <div>
          <h4>Reserva de amigo</h4>
          <div onClick={handleCheckFriend} className="link_check">
            {checkFriend ? (
              <BsFillCheckSquareFill />
            ) : (
              <>
                {" "}
                <BsFillSquareFill />
              </>
            )}
          </div>
        </div>
        <div>
          <h4>Reserva grupal</h4>
          <div onClick={handleCheckGroup} className="link_check">
            {checkGroup ? (
              <BsFillCheckSquareFill />
            ) : (
              <>
                {" "}
                <BsFillSquareFill />
              </>
            )}
          </div>
        </div>
      </div>
      <Link to='/mi_perfil' className="goBackBtn"><FaAngleLeft className="link_arrows"/>Volver  </Link>
    </div>
  )
}

export default My_preferences
