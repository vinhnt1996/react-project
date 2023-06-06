import axios from "axios";
const fetchUser = (page) => {
  return axios.get(`https://reqres.in/api/users?page=${page}`);
};
export { fetchUser };
