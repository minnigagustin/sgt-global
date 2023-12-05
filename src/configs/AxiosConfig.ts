import axios from "axios";

const AxiosUrl = axios.create({
    baseURL: process.env.URL_BACKEND,
});



export { AxiosUrl };