import React from "react";
import '../styles/cards.css'
import {useDispatch, useSelector} from 'react-redux'
import {addFriend, removeFriend} from '../store/user'
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import {AiFillEye} from "react-icons/ai";
import { Link } from "react-router-dom";

const FrienCard = ({ friendId, img, name, friend }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.data)

  const handleAdd = () => {
    dispatch(addFriend({userId: user._id, friendId}))
  }

  const handleRemove = () => {
    dispatch(removeFriend({userId: user._id, friendId}))
  }

  return (
    <div className="cardContainer">
      <div className="cardPhotoContainer">
        <div className="cardImg">
          <img src={img} alt="friend pick"></img>
        </div>
        {friend && (
          <div className="image-overlay"> 
            <Link className="linksFriend" to={`/reservas/${friendId}`}><AiFillEye /></Link>
          </div>
        )}
        {!friend && (
          <button className="friendIconsAdd">
            <FaUserPlus onClick={handleAdd} className="addRemoveFrienIcon" />
          </button>
        )}
        {friend && (
          <button className="friendIconsRemove">
            <FaUserMinus onClick={handleRemove} className="addRemoveFrienIcon" />
          </button>
        )}
      </div>
      <h5>{name}</h5>
    </div>
  );
};

export default FrienCard;
