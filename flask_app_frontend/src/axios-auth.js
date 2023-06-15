import axios from 'axios';
//this code says where to create a connection with and on which port. Axios is used to make requests. The back-end is with swagger Ui of port 5000
const instance = axios.create({
    baseURL: 'http://localhost:5000/'
});

export default instance
