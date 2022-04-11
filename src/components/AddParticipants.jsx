import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "../store/user";
import { addParticipant , removeParticipant, getEventById} from "../services/calendarServices";
import {FaUsers , FaUsersSlash} from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import swal from "sweetalert";


const AddParticipants = ({eventId, state, setAddParticipantsUp}) => {
    const user = useSelector(state => state.user.data)
    const friends = useSelector(state => state.user.friends)
    const [event, setEvent] = useState({})
    const dispatch = useDispatch();

    const renderingEvent = async () => {
      const event = await getEventById(eventId)
      setEvent(event)
    }

    useEffect(async () => {
        renderingEvent()
        dispatch(getAllFriends(user._id))  
      }, [])


     const handleAddtoEvent = async (friend) => {
       await addParticipant(eventId, friend._id, user.name)
       swal(`Agregaste a ${friend.name} a la sala`, {
        icon: "success",
        buttons: false,
        timer: 1000,
      })
      renderingEvent()
     }

     const handleRemove= async (friend) => {
      await removeParticipant(eventId, friend._id)
      swal(`Eliminaste a ${friend.name} de la sala`, {
        icon: "success",
        buttons: false,
        timer: 1000,
      })
      renderingEvent()
     }
    /*  const messegeNoFriends = () => {
       if(state && friends.length === 0) swal({
         title: "No tienes amigos actualemente!",
        text: "Ve a la seccion mis amigos en mi perfil y agrega algunos",
        buttons: false,
        timer: 2000,
      })
     } */


    return (
      <div className="friends_containerAddP">
          <FaRegTimesCircle className="close_addParticipants" onClick={() => setAddParticipantsUp({state: false})}/>
        {friends[0] && friends.map((friend,i)=> (
              <div className="cardContainer">
              <div className="cardPhotoContainer">
                <div className="cardImg">
                  <img src={friend.img} alt="friend pick"></img>
                </div>
                {event.usersId && event.usersId.includes(friend._id) ? (
                      <button className="IconsRemoveParticipants">
                        <FaUsersSlash onClick={()=> handleRemove(friend)} className="addParticipantsIcon" />
                      </button>
                ) : (
                      <button className="IconsAddParticipants">
                        <FaUsers onClick={()=> handleAddtoEvent(friend)} className="addParticipantsIcon" />
                      </button>
                )}
               
              </div>
              <h5>{friend.name}</h5>
            </div>
        ))}
        </div>
      );
}

export default AddParticipants;