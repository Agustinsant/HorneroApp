import React, { useEffect, useState } from "react";
import FrienCard from "../commons/FrienCard";
import FormInput from "../commons/FormInput";
import axios from "axios";
import {FaAngleRight} from 'react-icons/fa'


export default function My_friends() {
  
  const [amigos, setAmigos] = useState([]);

  useEffect(async () => {
    const amigos = await axios.get("https://reqres.in/api/users");
    setAmigos(amigos.data.data);
  }, []);

  console.log("Amigos", amigos);

  return (
    <div className="friendsCompContainer">
      <h6>Mis Amigos</h6>
      <div className="friendsSearch">
        <FormInput type="text" placeholder="A quien buscas?" />
        <button> <FaAngleRight className="link_arrows" /></button>
        
      </div>

      <div className="friends_container">
        {amigos.map((amigo) => {
          return (
            <FrienCard
              img={amigo.avatar}
              name={amigo.first_name}
              friend={false}
            />
          );
        })}
      </div>
    </div>
  );
}
