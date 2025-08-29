import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () =>{
    const req =  axios.get(baseUrl);
    return req.then(response=>response.data);
};
