import axios from 'axios'

const request = axios.create(
    {
        baseURL:"http://localhost:8080/api",
        timeout:5000
    }
)

export default request