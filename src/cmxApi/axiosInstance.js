import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: 'http://192.168.15.223:8080/CMX_Nipun_/',
    timeout: 5000
});

export default AxiosInstance;