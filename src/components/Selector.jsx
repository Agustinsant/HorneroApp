import { useState } from "react";
import { buildings, calendar } from "../utils";
import Floor from "./Floor";

function Selector() {
  const buildingsOptions = buildings.map((b) => {
    return b.name;
  });
  const [building, setBuilding] = useState("");
  const [floors, setFloors] = useState([]);
  const [floor, setFloor] = useState("");

  const handleSelectBuilding = (e) => {
    let selectedBuilding = e.target.value;

    let getData = buildings.filter((b) => b.name === selectedBuilding)[0]
      .Floors;

    setBuilding(selectedBuilding);
    setFloors(getData);
    console.log("building", building);
    console.log("floors", floors);
  };

  const handleSelectFloor = (e) => {
    let selectedFloor = e.target.value;
    let getData = floors.filter((f) => f.name === selectedFloor)[0].Desks;
    setFloor(getData);
    console.log(floor);
  };

  return (
    <>
      <div className="selector__container">
        <div className="selector__inputs">
          <select
            name="building"
            id="buildings"
            onChange={handleSelectBuilding}
          >
            <option value="" disabled selected hidden>
              Select building
            </option>
            {buildingsOptions.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {building ? (
            <>
              <select name="floors" id="floors" onChange={handleSelectFloor}>
                <option value="" disabled selected hidden>
                  Select floor
                </option>
                {floors.map((f, i) => (
                  <option key={i} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <></>
          )}
          {building && floor ? <Floor desks={floor} /> : <></>}
        </div>
      </div>
    </>
  );
}

export default Selector;
