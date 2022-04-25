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
                              localStorage.setItem("email", email);


      return response.data;
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
                localStorage.setItem("email", email);

      return response.data;
    });
};

const update = (email, password,age,gender,marital_status,have_kids,cats_or_dogs,
  social_media_usage,health_conscious,optimist_realist_pessimist,personality_type,hobbies,profession,income_level,political_viewpoint,
  economical_viewpoint,genre_of_music,genre_of_movies,latitude,longitude,friends) => {
  return axios
    .put(API_URL + "/update", {
      email, password,age,gender,marital_status,have_kids,cats_or_dogs,
  social_media_usage,health_conscious,optimist_realist_pessimist,personality_type,hobbies,profession,income_level,political_viewpoint,
  economical_viewpoint,genre_of_music,genre_of_movies,latitude,longitude,friends
    })
    .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response)
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getFriends = (email) => {
  return axios
    .post(API_URL + "/findfriends", {
      email,
    })
    .then((response) => {
      // console.log("hello",response.data)
      return JSON.stringify(response.data);
    });
};


const authService = {
  signup,
  login,
  logout,
  update,
  getCurrentUser,
  getFriends
};

export default authService;