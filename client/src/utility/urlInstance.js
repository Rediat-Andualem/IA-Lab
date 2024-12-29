import axios from 'axios'

let axiosInstance = axios.create({
    baseURL:"http://www.localhost:4789/api"
})
export {axiosInstance}