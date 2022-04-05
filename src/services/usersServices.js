import axios from "axios";


export const getUsersService = async () => {
    const users = await axios.get("http://localhost:3001/api/user/allUsers");
  
    return users.data
  };


export const searchUsersService = async ({value}) => {
    const users = await axios.post(`http://localhost:3001/api/search/nameOrEmail`, { value })
    console.log('SEARCH', users)
    return users.data
  }


  