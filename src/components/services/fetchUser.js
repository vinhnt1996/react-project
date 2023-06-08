import axios from "axios";
const fetchUser = (page) => {
  return axios.get(`https://reqres.in/api/users?page=${page}`);
};
const addUser = (name, job) => {
  return axios.post("https://reqres.in/api/users", { name: name, job: job });
};
const updateUser = (id, name, job) => {
  return axios.put(`https://reqres.in/api/users/${id}`, { name, job });
};
const deleteUser = (id) => {
  return axios.delete(`https://reqres.in/api/users/${id}`);
};
export { fetchUser, addUser, updateUser, deleteUser };
