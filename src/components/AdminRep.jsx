import { useState } from "react"
import {Bar} from "react-chartjs-2"


const AdminReport = ()=> {
    const [monthView, setMonthView] = useState(true)
    const [weekView, setWeekView]= useState(false)

    return (
        <Bar/>
    )



} 