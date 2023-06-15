import axios from 'axios';
//this code says where to create a connection with and on which port. Axios is used to make requests
const instance = axios.create({
    baseURL: 'http://localhost:5000/'
});

export default instance
