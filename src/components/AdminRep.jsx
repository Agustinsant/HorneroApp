import { useState } from "react"
import {Bar} from "react-chartjs-2"
import {data , options} from "../utils/fakeForFloors"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  


const AdminReport = ()=> {
    const [monthView, setMonthView] = useState(true)
    const [weekView, setWeekView]= useState(false)

    return (
        <Bar data={data} options={options}/>
    )



} 

export default AdminReport;