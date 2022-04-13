import axios from "axios";


export const singleBuilding = async ({buildingId}) => {
    const info = await axios.get(`http://localhost:3001/api/building/${buildingId}`)
    console.log("infor--->", info)
    return info.data
}

export const addDayWeek = async ({buildingId, dayId}) => {
    const info = await axios.post(`http://localhost:3001/api/admin/addDay/${buildingId}`, {dayId})
    return info.data
  }

  export const updateHours = async ({buildingId, start, end}) => {
    const info = await axios.post(`http://localhost:3001/api/admin/businessHours/${buildingId}`, {start, end})
    return info.data
  }

export const removeDayWeek = async ({buildingId, dayId}) => {
    const info = await axios.post(`http://localhost:3001/api/admin/removeDay/${buildingId}`, {dayId})
    return info.data
}


export const yearReport = async (buildingId) => {
    const info = await axios.get(`http://localhost:3001/api/admin/yearReport/${buildingId}`)
    return info.data
}

export const monthReport = async (buildingId, year,month) => {
    const info = await axios.post(`http://localhost:3001/api/admin/monthReport/${buildingId}`, {year, month})
    return info.data
}

  export const weekReport = async (buildingId, year,month,week) => {
    const info = await axios.post(`http://localhost:3001/api/admin/weekReport/${buildingId}`, {year, month,week})
      return info.data
}