// File: src/lib/axios.js
import axios from "axios"

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: false,
    headers: {
        Accept: "application/json"
    }
})

export default instance
