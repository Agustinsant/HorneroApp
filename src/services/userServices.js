import axios from "axios";

export const userLoginService = async ({ email, password }) => {
  const user = await axios.post("http://localhost:3001/api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", user.data.data.token);

  return user.data.data.token;
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
  const user = await axios({
    method: "GET",
    headers: { "auth-token": token },
    url: "http://localhost:3001/api/user/me",
  });

  localStorage.setItem("user", JSON.stringify(user.data));

  return user.data;
};

export const logOutService = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const editUserService = async ({ id, name, city, email, password }) => {
  const user = await axios.post(
    `http://localhost:3001/api/user/updateUser/${id}`,
    { name, city, email, password }
  );
  return user.data;
};

export const addFriendService = async ({userId, friendId}) => {
  const user = await axios.post(`http://localhost:3001/api/user/${userId}/addFriend`, {friendId});
  return user.data;
}


export const removeFriendService = async ({userId, friendId}) => {
  const user = await axios({
    method: 'DELETE',
    data: {friendId},
    url: `http://localhost:3001/api/user/${userId}/deletefriend`
  });
  return user.data;
}

export const getAllFriendsService = async (userId) => {
  const friends = await axios.get(`http://localhost:3001/api/user/${userId}/allFriends`)

  return friends.data
}


export const editUserPasswordService = async ({id, password}) => {
  const user = await axios.post(`http://localhost:3001/api/user/updateUserPassword/${id}`, { password } )
  return user.data
}

<<<<<<< HEAD
export const getUserById = async (userId) => {
  const user = await axios.get(`http://localhost:3001/api/user/${userId}`)
  return user.data

}
=======

>>>>>>> 40b2827f74d93c235f4440c52b4120120bf2b910

export const sendPasswordService = async (email) => {
  const user = await axios.post(`http://localhost:3001/api/recover/${email}`)
  return user.data

}