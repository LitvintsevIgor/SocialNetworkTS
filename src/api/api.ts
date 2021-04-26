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
    },

    unfollow (userID: number) {
        return instance.delete(`/follow/${userID}`)
            .then( response => {
                return response.data
            })
    },

    follow (userID: number) {
        return instance.post(`/follow/${userID}`)
            .then( response => {
                return response.data
            })
    }
}

export const authAPI = {
    auth () {
        return instance.get(`auth/me`)
            .then( response => {
                return response.data
            })
    }
}