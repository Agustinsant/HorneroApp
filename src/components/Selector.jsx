import { useState } from "react";
import { useSelector } from "react-redux";

import Floor from "./Floor";
import { getFloor } from "../services/buildingServices";
import useInput from "../hooks/useInput";

function Selector() {
  const buildings = useSelector((state) => state.buildings.data);

  const [floors, setFloors] = useState([]);
  const [floor, setFloor] = useState({});
  const [dateSelector, setDateSelector] = useState(false);
  const day = useInput();

  const handleSelectBuilding = (e) => {
    let selectedBuilding = e.target.value;
    let getData = buildings.filter((b) => b.city === selectedBuilding)[0]
      .floors;
    setFloors(getData);
  };

  const handleSelectFloor = async (e) => {
    let selectedFloor = e.target.value;
    let getData = floors.filter((f) => f.name === selectedFloor)[0]._id;
    let data = await getFloor(getData);
    setFloor(data);
  };
  const showCalendarMonth = () => {
    setDateSelector(true);
  };
  console.log(day);

  return (
    <>
      {buildings[0] && (
        <div className="selector__container">
          <div className="selector__inputs">
            <div className="selector__box">
              <select
                name="building"
                id="buildings"
                onChange={handleSelectBuilding}
              >
                <option disabled selected hidden>
                  Select building
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
                      Select floor
                    </option>
                    {floors.map((f, i) => (
                      <option key={i}>{f.name}</option>
                    ))}
                  </select>
                </>
              ) : (
                <></>
              )}
              {floor._id ? <input type="date" {...day} /> : <></>}
            </div>
            {floor.desks && <Floor floor={floor} day={day.value} />}
          </div>
        </div>
      )}
    </>
  );
}

export default Selector;
