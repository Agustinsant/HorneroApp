import axios from "axios";

export const userLoginService = async ({email, password}) => {
  const user = await axios.post("http://localhost:3001/api/user/login", {email, password});
  localStorage.setItem('token', user.data.data.token )
 
  
  return user.data.data.token;
};

export const getUsersService = async () => {
  const users = await axios.get("http://localhost:3001/api/user/allUsers");

  return users.data[users.data.length - 1];
};

export const signInUserSerice = async ({ name, city, email, password }) => {
  const user = await axios.post("http://localhost:3001/api/user/register", {
    name,
    city,
    email,
    password,
    
  });

  return user;
};

export const persistUserSerice = async (token) => {
  const user = await axios ({
    method: 'GET',
    headers: {'auth-token' : token},
    url: "http://localhost:3001/api/user/me"})

    localStorage.setItem('user', JSON.stringify(user.data))

  return user.data
}

export const logOutService = async () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const editUserService = async ({id, name, city, email}) => {
  const user = await axios.post(`http://localhost:3001/api/user/updateUser/${id}`, {name, city, email} )
  return user.data
}