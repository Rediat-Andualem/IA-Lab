import axios from 'axios'

let axiosInstance = axios.create({
    baseURL:"http://localhost:4789/api"
})
export {axiosInstance}



// http://localhost:4789/api/booking/equipmentBookings