import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import {Bar} from "react-chartjs-2"
import {yearMonths, Weeks ,dayOfWeek , Hours} from "../utils/chartUtils"
import { yearReport, monthReport, weekReport } from "../services/adminServices"; 
import {updateHoursBilding ,addDayWeekBuilding, removeDayWeekBuilding, getSingleBuilding} from "../store/building"
import swal from "sweetalert";
import {BsClipboardData, BsCalendarCheck, BsClockHistory} from "react-icons/bs";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { useNavigate } from "react-router";



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

    const [color, setColor] = useState("green")
    const [UpSetingsDays, setUpsetingsDays]= useState(false)
    const [UpSetingsHours, setUpsetingsHours]= useState(false)
    const [UpStadistics, setUpStadistics]= useState(false)
    const [dropMonthUp, setDropMonthUp] = useState(false)
    const [dropWeekUp, setDropWeekUp] = useState(false)
    const [dropYearUp, setDropYearUp] = useState(false)
    const [monthSelect, setMonthSelect] = useState(0)
    const [weekSelect, setWeekSelect] = useState("")
    const [yearSelect, setYearSelect]= useState("")
    const [hourStartSelect, sethourStartSelect] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)



    const building = useSelector(state => state.buildings.singleBuilding)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        if(user){
            if(user.isAdmin) {
                setIsAdmin(true)
            } else{
                swal("Solo Perfiles de Administrador pueden acceder aqui!",{
                    icon: "error",
                    buttons: false,
                    timer: 2000,
                  });
                  navigate("/")
            }
        } else {
            navigate("/login")
        }
    },[])


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
        setWeekSelect(weekSelected)
        const week = await weekReport(buildingId,yearSelect,monthSelect,weekSelected)
        setDataInfo(setData(week))
        setOptionsInfo(setOptions(week))
    }

      /* ----------- HANDLERS ---------*/ 

      const handlerCheckBox = async (e) => {
          if(e.target.checked){
            dispatch(
              addDayWeekBuilding({buildingId, dayId: e.target.value})
            )
        } else {
          dispatch(
            removeDayWeekBuilding({buildingId, dayId: e.target.value})
          )
        }
      }
      
       

      const handleUp = (type) => {
        if(type === "days"){
            UpSetingsDays ? ( setUpsetingsDays(false)):(setUpsetingsDays(true))
        }
        if(type === "hours"){
            UpSetingsHours ? ( setUpsetingsHours(false)):(setUpsetingsHours(true))
        }
        if(type === "chart"){
            UpStadistics ? ( setUpStadistics(false)):(setUpStadistics(true))
        }
      }

      const handleHourSelectStart = (e) => {
        sethourStartSelect(e.target.value)
      }

      const handleHourSelectEnd = async (e) => {
        
        dispatch(
          updateHoursBilding({buildingId, start: hourStartSelect, end: e.target.value})
        )
        swal("Horarios Actualizados",{
            icon: "success",
            buttons: false,
            timer: 2000,
          });
        setUpsetingsHours(false)
    }
   

    return (
        <>
 <div className="profile_container">
                <h6 className="headerAdmin">Panel de Administrador</h6>
</div>
        <div className="profile_links topmargin">
            <div className="selector__inputsAdmin">
                <div>
                  <select
                    name="building"
                    id="buildings"
                    onChange={(e) => {
                      setBuildingId(e.target.value)
                      dispatch(
                        getSingleBuilding({buildingId: e.target.value})
                      )
                    }}
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
            {buildingId && <><h5 className="UpStadistics">Configurar Dias de Trabajo <BsCalendarCheck className="green" onClick={() => handleUp("days")}/></h5> <hr/></>}
            
           
            {building && UpSetingsDays && dayOfWeek.map((day,i)=> (
                <div key={i} className="daySeetings">
                    <div>
                        <h4 className="daySet">{day.name}</h4>
                    </div>
                    <input type="checkbox" checked={building.availableDays.includes(day.id)}value={day.id} onChange={handlerCheckBox}/>
                </div>
                ))}
        </div>


        {buildingId && <div className="profile_links"><h5 className="UpStadistics">Configurar Horas de Oficina <BsClockHistory className="green" onClick={() => handleUp("hours")}/></h5> <hr/></div>}

        {UpSetingsHours && (
            <>
            <div className="selector__inputsAdmin">
                <h6>Horario de Apertura</h6>
            <div>
              <select
                name="Start"
                id="buildings"
                onChange={handleHourSelectStart}
              >
                <option disabled selected hidden>
                  Seleccione un Horario
                </option>

                {Hours.map((hour, i) => (
                  <option key={i} value={hour}>{hour}</option>
                ))}
              </select>
              </div>
              </div>

              <div className="selector__inputsAdmin">
                <h6>Horario de Cierre</h6>
                <div>
                  <select
                    name="End"
                    id="buildings"
                    onChange={handleHourSelectEnd}
                  >
                    <option disabled selected hidden>
                      Seleccione un Edificio
                    </option>
    
                    {Hours.map((hour, i) => (
                    <option key={i} value={hour}>{hour}</option>
                ))}
                  </select>
                  </div>
                  </div>
                  </>
        )}

        {buildingId && <div className="profile_links"><h5 className="UpStadistics">Estadisticas  <BsClipboardData className="green" onClick={() => handleUp("chart")}/></h5> <hr/></div>}
        <div className="profile_container">
        
       
        
            {UpStadistics && (
                <div className="buttonsChart">
                    <div className="ChartView">
                      <button className="buttonSelector" onClick={handleYear}>Año</button>
                      <button className="buttonSelector"onClick={handleMonth}>Mes</button>
                      <button className="buttonSelector"onClick={handleWeek}>Semana</button>
                    </div>
                    <div className="CharSelector">
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
          
            {dataInfo.labels && yearSelect && UpStadistics &&(   
                <div className="chart-Container">
                <Bar data={dataInfo} options={optionsInfo}/>
                </div>
            )}
</div>
</>
    )
}




export default AdminReport;