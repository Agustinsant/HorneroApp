import '../styles/friends.css'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../store/users";
import { getAllFriends } from "../store/user";
import FrienCard from "../commons/FrienCard";
import useInput from "../hooks/useInput";
import { FaAngleRight } from "react-icons/fa";
import swal from "sweetalert";

export default function My_friends() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);
  const user = useSelector((state) => state.user.data);
  const friends = useSelector((state) => state.user.friends);
  const search = useInput();

  const [friendsSearch, setFriensSearch] = useState(false);

  useEffect(() => {
    setFriensSearch(false);
  }, []);

  useEffect(() => {
    dispatch(getAllFriends(user._id));
  }, [user.friends.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      searchUsers({ value: search.value.toLocaleLowerCase(), userId: user._id })
    ).then((data) => {
      if (data.payload.docs.length === 0) {
        swal({
          text: "No hay resultados para tu busqueda!",
          icon: "error",
          timer: 2000,
          buttons: false,
        });
      }
    });
    setFriensSearch(true);
    search.setValue("");
  };

  return (
    <div className="friendsCompContainer">
      <h6>Amigos</h6>
      <div className="friendsSearch">
        <form className="form__input" onSubmit={handleSearch}>
          <input {...search} type="text" placeholder="A quien buscas?" />
          <button type="submit">
            <FaAngleRight className="link_arrows" />
          </button>
        </form>
      </div>
      {friendsSearch && users[0] && (
        <div className="friends_container">
          {users.map((amigo, i) => {
            return (
              <FrienCard
                key={i}
                friendId={amigo._id}
                img={amigo.img}
                name={amigo.name}
                friend={user.friends.includes(amigo._id)}
              />
            );
          })}
        </div>
      )}
      {friendsSearch && users[0] && <hr></hr>}

      <h6>Mis Amigos</h6>
      <div className="friends_container">
        {friends.map((amigo, i) => {
          return (
            <FrienCard
              key={i}
              friendId={amigo._id}
              img={amigo.img}
              name={amigo.name}
              friend={user.friends.includes(amigo._id)}
            />
          );
        })}
      </div>
    </div>
  );
}
