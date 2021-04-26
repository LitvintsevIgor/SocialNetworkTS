import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "77376ca6-8140-4501-a63e-0618cf645ecb"},
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
})

export const usersAPI = {
    getUsers (currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then( response => {
                return response.data
            })
    }
}

// export const getUsers = (currentPage: number, pageSize: number) => {
//     return instance.get(`users?page=${currentPage}&count=${pageSize}`)
//         .then( response => {
//         return response.data
//     })
// }