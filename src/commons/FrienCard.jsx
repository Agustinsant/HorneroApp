import React from "react";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";

const FrienCard = ({ img, name, friend }) => {
  console.log(img, name, friend);
  return (
    <div className="cardContainer">
      <div className="cardPhotoContainer">
        <div className="cardImg">
          <img src={img} alt="friend pick"></img>
        </div>

        {!friend && (
          <button className="friendIconsAdd">
            <FaUserPlus className="addRemoveFrienIcon" />
          </button>
        )}
        {friend && (
          <button className="friendIconsRemove">
            <FaUserMinus className="addRemoveFrienIcon" />
          </button>
        )}
      </div>
      <h5>{name}</h5>
    </div>
  );
};

export default FrienCard;
