import axios from "axios";

const API_URL = "users";

const signup = (first,last,email, password) => {
  return axios
    .post(API_URL + "/signup", {
      email,
      password,
    })
    .then((response) => {
              localStorage.setItem("user", JSON.stringify(response.data));

      // return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;