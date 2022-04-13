import { FaRegTimesCircle } from "react-icons/fa";

function CanvasReferences({ setReferences }) {
  const colors = {
    desk: {
      empty: "#39B54A",
      concurred: "#BFD732",
      full: "#444444 ",
    },
    hall: {
      empty: "#F7931E",
      concurred: "#BFD732",
      full: "#444444 ",
    },
  };
  return (
    <div className="references">
      <div className="references__container">
        <div className="close__references">
          <FaRegTimesCircle onClick={() => setReferences(false)} />
        </div>
        <table className="references__table">
          <tr>
            <th>Elemento</th>
            <th>Estado</th>
            <th>Color</th>
          </tr>
          <tr>
            <td>Escritorios</td>
            <td>Disponibles</td>
            <td>
              <div className="emptyDesk"></div>
            </td>
          </tr>
          <tr>
            <td>Salas</td>
            <td>Disponibles</td>
            <td>
              <div className="emptyHall"></div>
            </td>
          </tr>
          <tr>
            <td>Escritorios/Salas</td>
            <td>Concurridos</td>
            <td>
              <div className="concurred"></div>
            </td>
          </tr>
          <tr>
            <td>Escritorios/Salas</td>
            <td>Ocupados</td>
            <td>
              <div className="full"></div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default CanvasReferences;
