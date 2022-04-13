import axios from "axios";

export const yearReport = async (buildingId) => {
    const info = await axios.get(`http://localhost:3001/api/admin/yearReport/${buildingId}`)
    return info.data
  }

export const monthReport = async (buildingId, year,month) => {
    const info = await axios.post(`http://localhost:3001/api/admin/monthReport/${buildingId}`, {year, month})
    return info.data
  }

  export const weekReport = async (buildingId, year,month,week) => {
      console.log("year", year)
      console.log("year", month)
      console.log("year", week)
    const info = await axios.post(`http://localhost:3001/api/admin/weekReport/${buildingId}`, {year, month,week})
    console.log("infooo -->>", info.data)
    return info.data
  }