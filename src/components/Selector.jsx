import { useState } from "react";
import { useSelector } from "react-redux";

import Floor from "./Floor";
import { getFloor } from "../services/buildingServices";

function Selector() {
  const buildings = useSelector((state) => state.buildings.data);
  const [floors, setFloors] = useState({
    data: [],
    disabled: true,
  });
  const [floor, setFloor] = useState("");
  const [dateSelector, setDateSelector] = useState(false);
  const [day, setDay] = useState({
    data: "",
    disabled: true,
  });

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

  const floorNames = () => {
    return floors.data.map((f, i) => <option key={i}>{f.name}</option>);
  };

  const handleSelectBuilding = (e) => {
    setFloors({
      data: [],
      disabled: true,
    });
    setFloor({});
    setDay({
      data: "",
      disabled: true,
    });
    let selectedBuilding = e.target.value;
    let getData = buildings.filter((b) => b.city === selectedBuilding)[0]
      .floors;

    setTimeout(() => {
      setFloors({
        data: getData,
        disabled: false,
      });
    }, 0);
  };

  const resetColor = async () => {
    let data = await getFloor(floor._id);
    const resetColors = data.desks.map((d) => (d.color = colors.desk.empty));
    data.desk = resetColors;
    setFloor(data);
  };

  const handleSelectFloor = async (e) => {
    let selectedFloor = e.target.value;
    let getData = floors.data.filter((f) => f.name === selectedFloor)[0]._id;
    let data = await getFloor(getData);
    const resetColors = data.desks.map((d) => (d.color = colors.desk.empty));
    data.desk = resetColors;
    setFloor(data);
    setDay({
      data: "",
      disabled: false,
    });
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
                  Seleccione un edificio
                </option>

                {buildings.map((building, i) => (
                  <option key={i}>{building.city}</option>
                ))}
              </select>
              <select
                name="floors"
                id="floors"
                onChange={handleSelectFloor}
                disabled={floors.disabled}
              >
                <option selected hidden>
                  Seleccione un piso
                </option>
                {floorNames()}
              </select>
              <input
                type="date"
                value={day.data}
                disabled={day.disabled}
                onChange={(e) => {
                  setDay({
                    data: e.target.value,
                    disabled: false,
                  });
                  resetColor();
                }}
              />
            </div>
            {!floor.desks ? (
              <div className="floor_container"></div>
            ) : (
              <Floor floor={floor} day={day.data} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Selector;
