import axios from "axios";

export const userLoginService = async () => {
  const user = await axios.get("https://fakestoreapi.com/users");

  return user.data;
};
