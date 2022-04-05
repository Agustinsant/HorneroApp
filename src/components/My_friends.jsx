import { useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../store/users";
import { getAllFriends } from "../store/user";
import FrienCard from "../commons/FrienCard";
import useInput from "../hooks/useInput";
import { FaAngleRight } from "react-icons/fa";

export default function My_friends() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);
  const user = useSelector(state => state.user.data)
  const friends = useSelector(state => state.user.friends)
  const search = useInput();


  useEffect(() => {
    dispatch(getAllFriends(user._id))
    
  }, [user.friends.length])
  
  

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchUsers({ value: search.value }));
    search.setValue('')
  };

  return (
    <div className="friendsCompContainer">
      <h6>Amigos</h6>
      <div className="friendsSearch">
        <form className="form__input" onSubmit={handleSearch}>
          <input {...search} type="text" placeholder="A quien buscas?" />
        <button type="submit">
          {" "}
          <FaAngleRight className="link_arrows" />
        </button>
        </form>
      </div>

      {users[0] && <div className="friends_container">
        
        {users.map((amigo, i) => {
          return <FrienCard key={i} friendId={amigo._id} img={amigo.img} name={amigo.name} friend={
            user.friends.includes(amigo._id)
            } />;
        })}
      </div> }
      {!users[0] && <h5>{`No hay resultados`}</h5>}
      <hr></hr>
      <h6>Mis Amigos</h6>
      <div className="friends_container">
        {friends.map((amigo, i) => {
          return <FrienCard key={i} friendId={amigo._id} img={amigo.img} name={amigo.name} friend={
            user.friends.includes(amigo._id)
            } />;
        })}
      </div>
    </div>
  );
}
