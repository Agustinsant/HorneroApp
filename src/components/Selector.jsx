import { useState } from "react";
import { useSelector } from "react-redux";

import Floor from "./Floor";
import Welcome from "./Welcome";
import { getFloor } from "../services/buildingServices";

function Selector() {
  const buildings = useSelector((state) => state.buildings.data);

  const [floors, setFloors] = useState([]);
  const [floor, setFloor] = useState([]);

  const handleSelectBuilding = (e) => {
    let selectedBuilding = e.target.value;
    console.log(selectedBuilding);
    console.log(buildings);
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
                <option value="" disabled selected hidden>
                  Select building
                </option>
                {buildings.map((building, i) => (
                  <option key={i} value={building.city}>
                    {building.city}
                  </option>
                ))}
              </select>
              {floors[0] ? (
                <>
                  <select
                    name="floors"
                    id="floors"
                    onChange={handleSelectFloor}
                  >
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
            </div>

            {floor.desks && <Floor floor={floor} />}
          </div>
        </div>
      )}
    </>
  );
}

export default Selector;
