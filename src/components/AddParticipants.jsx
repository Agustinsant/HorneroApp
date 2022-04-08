import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "../store/user";
import { addParticipant , removeParticipant} from "../services/calendarServices";
import {AiOutlineUsergroupAdd, AiOutlineUsergroupDelete} from "react-icons/ai";
import swal from "sweetalert";


const AddParticipants = ({eventId}) => {
  console.log("eventId", eventId)
    const user = useSelector(state => state.user.data)
    const friends = useSelector(state => state.user.friends)
    const dispatch = useDispatch();

    useEffect(async () => {
        dispatch(getAllFriends(user._id))  
      }, [])

     const handleAddtoEvent = async (friend) => {
      console.log("eventId", eventId)
       await addParticipant(eventId, friend._id)
       swal(`Agregaste a ${friend.name} a la sala`, {
        icon: "success",
        buttons: false,
        timer: 1000,
      })
     }

    console.log("friends", friends)

    return (
      <div className="friends_container">
        {friends[0] && friends.map((friend,i)=> (
              <div className="cardContainer">
              <div className="cardPhotoContainer">
                <div className="cardImg">
                  <img src={friend.img} alt="friend pick"></img>
                </div>
                <button className="friendIconsAdd">
                   <AiOutlineUsergroupAdd onClick={()=> handleAddtoEvent(friend)} className="addParticipantsIcon" />
              </button>
              </div>
              <h5>{friend.name}</h5>
            </div>
        ))}
        </div>
      );
}

export default AddParticipants;