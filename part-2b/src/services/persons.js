import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((response) => response.data);
};

const createPerson = (item) => {
  const req = axios.post(baseUrl, item);
  return req.then((response) => response.data);
};

const updatePerson = (id, item) => {
  const req = axios.put(`${baseUrl}/${id}`, item);
  return req.then((response) => response.data);
};

const patchPerson = (id, item) => {
  const req = axios.patch(`${baseUrl}/${id}`, item);
  return req.then((response) => response.data);
};

const deletePerson = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((response) => response.data);
};

const personService = {
  getAll,
  createPerson,
  updatePerson,
  patchPerson,
  deletePerson,
};

export default personService;
