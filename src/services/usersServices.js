import axios from "axios";


export const getUsersService = async () => {
    const users = await axios.get("http://localhost:3001/api/user/allUsers");
  
    return users.data
  };


export const searchUsersService = async ({value, userId}) => {
    const users = await axios.post(`http://localhost:3001/api/search/nameOrEmail`, { value, userId })
    console.log('SEARCH', users)
    return users.data
  }


  