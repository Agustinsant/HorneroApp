import { useState } from "react";
import { useSelector } from "react-redux";

import Floor from "./Floor";
import { getFloor } from "../services/buildingServices";

function Selector() {
  const buildings = useSelector((state) => state.buildings.data);
  const [floors, setFloors] = useState([]);
  const [floor, setFloor] = useState({});
  const [dateSelector, setDateSelector] = useState(false);
  const [day, setDay] = useState("");

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

  const handleSelectBuilding = (e) => {
    let selectedBuilding = e.target.value;
    let getData = buildings.filter((b) => b.city === selectedBuilding)[0]
      .floors;
    setFloors(getData);
  };
  const resetColor = async () => {
    let data = await getFloor(floor._id);
    const resetColors = data.desks.map((d) => (d.color = colors.desk.empty));
    data.desk = resetColors;
    setFloor(data);
  };

  const handleSelectFloor = async (e) => {
    let selectedFloor = e.target.value;
    let getData = floors.filter((f) => f.name === selectedFloor)[0]._id;
    let data = await getFloor(getData);
    const resetColors = data.desks.map((d) => (d.color = colors.desk.empty));
    data.desk = resetColors;
    setFloor(data);
  };
  const showCalendarMonth = () => {
    setDateSelector(true);
  };

  return (
    <>
      {buildings[0] && (
        <div className="selector__container">
          <div className="selector__img"></div>
          <div className="selector__inputs">
            <div className="selector__box">
              <select
                name="building"
                id="buildings"
                onChange={handleSelectBuilding}
              >
                <option disabled selected hidden>
                  Seleccione un Edificio
                </option>
                {buildings.map((building, i) => (
                  <option key={i}>{building.city}</option>
                ))}
              </select>
              {floors[0] ? (
                <>
                  <select
                    name="floors"
                    id="floors"
                    onChange={handleSelectFloor}
                  >
                    <option disabled selected hidden>
                      Seleccione un piso
                    </option>
                    {floors.map((f, i) => (
                      <option key={i}>{f.name}</option>
                    ))}
                  </select>
                </>
              ) : (
                <></>
              )}
              {floor._id ? (
                <input
                  type="date"
                  onChange={(e) => {
                    setDay(e.target.value);
                    resetColor();
                  }}
                />
              ) : (
                <></>
              )}
            </div>
            {floor.desks && <Floor floor={floor} day={day} />}
          </div>
        </div>
      )}
    </>
  );
}

export default Selector;
