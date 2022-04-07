import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function Welcome() {
  const user = useSelector((state) => state.user.data);
  console.log('useeeeeeeeer',user)
  const navigate = useNavigate();

  if(!user.name) return navigate('login')

  return (
    <div className="welcome__container">
      <div className="welcome__box">
        <h3 className="welcome__title">Bienvenido {user?.name}</h3>
        <h4 className="welcome__message">Encuentra tu lugar perfecto</h4>
        <button
          className="welcome__goButton"
          onClick={() => navigate("/explore")}
        >
          Busca tu lugar
        </button>
      </div>
    </div>
  );
}

export default Welcome;
