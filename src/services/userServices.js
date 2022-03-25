import axios from "axios";

export const userLoginService = async () => {
  const user = await axios.get("https://fakestoreapi.com/users");

  return user.data;
};

export const getUsersService = async () => {
  const users = await axios.get("http://localhost:3001/api/user/allUsers");

  return users.data[0];
};

export const signInUserSerice = async ({ name, email, password }) => {
  const user = await axios.post("http://localhost:3001/api/user/register", {
    name,
    email,
    password,
  });

  return user;
};
