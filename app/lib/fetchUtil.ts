import axios from 'axios';
import { constant } from './contstant';
// import { createCookie } from "react-router";

// let authToken: string | null = null

// export const tokenCookie = createCookie("token", {
//   httpOnly: true,
//   path: "/",
//   sameSite: "lax",
//   maxAge: 60 * 60 * 24,
// })

export const fetchUtils = axios.create({
  baseURL: `${constant.env.VITE_API_URL}/api`,
  timeout: 10_000,
  withCredentials: true,
});

// fetchUtils.interceptors.request.use(
//     (config) => {
//         if(authToken){
//             config.headers["Authorization"] = `Bearer ${authToken}`
//         }
//         return config
//     },
//     (error) => Promise.reject(error)
// )

// export default function setApiToken(token: string){
//     authToken = token
// }
