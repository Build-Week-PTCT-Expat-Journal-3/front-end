import axios from "axios";

export const axiosWithAuth = () => {
  //get token from local storage
  const token = window.localStorage.getItem("token");
  return axios.create({
    headers: {
      authorization: token
    },
    baseURL: "https://expat-journalp16.herokuapp.com/api"
  });
};
