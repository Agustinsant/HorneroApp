import { useEffect, useState } from "react"
import {Bar} from "react-chartjs-2"
import {yearMonths, Weeks} from "../utils/chartUtils"
import { yearReport, monthReport, weekReport } from "../services/adminServices"; 
import {BsClipboardData} from "react-icons/bs";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { useSelector } from "react-redux";




  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

const AdminReport = ()=> {
    const buildings = useSelector((state) => state.buildings.data);
    const user = useSelector(state => state.user.data)
    const [buildingId, setBuildingId] = useState("")

    const [dataInfo, setDataInfo] = useState({})
    const [optionsInfo, setOptionsInfo] = useState({})

    const [dropMonthUp, setDropMonthUp] = useState(false)
    const [dropWeekUp, setDropWeekUp] = useState(false)
    const [dropYearUp, setDropYearUp] = useState(false)
    const [monthSelect, setMonthSelect] = useState(0)
    const [weekSelect, setWeekSelect] = useState("")
    const [yearSelect, setYearSelect]= useState("")


    /* ---------- SETERS ---------- */
      const setData = ({labels, data, label}) => {
          return  {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: '#bfd732 ',
                    borderColor: '#39B54A',
                    borderWidth: 1
                }]
              }
      }
      const setOptions = ({text})=> {
          return {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom' 
              },
              title: {
                display: true,
                text: text,
              },
            },
          }
      }




    
    /* ----------- TYPE CHART  VIEWS---------*/

  
    const handleYear = async () => {
        setDropYearUp(true)
        setDropMonthUp(false)
        setDropWeekUp(false)
        const year = await yearReport(buildingId)
        setDataInfo(setData(year))
        setOptionsInfo(setOptions(year))
      }
    const handleMonth = () => {
        setDropYearUp(true)
        setDropMonthUp(true)
        setDropWeekUp(false)
    }
    const handleWeek = () => {
        setDropYearUp(true)
        setDropMonthUp(true)
        setDropWeekUp(true)
      }
 
    const handlerMonthSelect = async (e) => {
        const monthSelected = e.target.value
        setMonthSelect(monthSelected)
        const month = await monthReport(buildingId,yearSelect,monthSelected)
        setDataInfo(setData(month))
        setOptionsInfo(setOptions(month))

    }

    const handlerWeekSelect = async (e) => {
        const weekSelected = e.target.value
        console.log("week target", weekSelect)
        setWeekSelect(weekSelected)
        const week = await weekReport(buildingId,yearSelect,monthSelect,weekSelected)
        setDataInfo(setData(week))
        setOptionsInfo(setOptions(week))
    }

      /* ----------- HANDLERS ---------*/ 
   

    return (
        <>
        <h1 className="UpStadistics">Estadisticas<BsClipboardData/></h1>
                <div className="selector__inputsAdmin">
                <div>
                  <select
                    name="building"
                    id="buildings"
                    onChange={(e) => setBuildingId(e.target.value)}
                  >
                    <option disabled selected hidden>
                      Seleccione un Edificio
                    </option>
    
                    {buildings.map((building, i) => (
                      <option key={i} value={building._id}>{building.city}</option>
                    ))}
                  </select>
                  </div>
            </div>
            {buildingId && (
                <div className="buttonsChart">
                    <div>
                      <button className="buttonSelector" onClick={handleYear}>Año</button>
                      <button className="buttonSelector"onClick={handleMonth}>Mes</button>
                      <button className="buttonSelector"onClick={handleWeek}>Semana</button>
                    </div>
                    <div>
                        {dropYearUp && (
                             <select 
                             className="buttonSelector"
                             name="Years"
                             id="Years"
                             onChange={(e) => setYearSelect(e.target.value)}
                           >
                             <option disabled selected hidden>
                               Seleccione un Año
                             </option>
    
                             <option value={2022}>2022</option>
                           </select>
    
                        )}
    
                        {dropMonthUp && (
                            <select 
                            className="buttonSelector"
                            name="Months"
                            id="Months"
                            onChange={handlerMonthSelect}
                          >
                            <option disabled selected hidden>
                              Seleccione un Mes
                            </option>
            
                            {yearMonths.map((month, i) => (
                              <option key={i} value={month.id}>{month.name}</option>
                            ))}
                          </select>
                        )}
                        {dropWeekUp && (
                             <select 
                            className="buttonSelector"
                            name="Weeks"
                            id="Weeks"
                            onChange={handlerWeekSelect}
                          >
                            <option disabled selected hidden>
                              Seleccione una Semana
                            </option>
            
                            {Weeks.map((week, i) => (
                              <option key={i} value={week.id}>{week.name}</option>
                            ))}
                          </select>
                        )}
                    </div>
                </div>
                  )}
          
            {dataInfo.labels && yearSelect && (   
                <div className="chart-Container">
                <Bar data={dataInfo} options={optionsInfo}/>
                </div>
            )}
</>
    )
}




export default AdminReport;