import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ef46312a-a111-435b-9eec-c96782ca0eb6"
    }
});

export const usersApi = {
    getUsers (currentPage = 1, pageSize = 10)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}` )
            .then(response => response.data)
    },
    followUser (userId) {
        return instance.post(`follow/${userId}`).then(response => response.data)
    },
    unfollowUser (userId) {
        return instance.delete(`follow/${userId}`).then(response => response.data)
    },
    getProfileUser (userId) {
        console.warn('Obsolete method. Please profileSpi object.')
        return profileApi.getProfileUser(userId)
    },
};

export const profileApi = {

    getProfileUser (userId) {
        return instance.get(`profile/${userId}`).then(response => response.data)
    },
    getStatusUser (userId) {
        return instance.get(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatusUser(status) {
        return instance.put(`profile/status/`,
            {
            status: status
        }).then(response => response.data)
    }
};

export const authMeApi = {
    authUser () {
        return instance.get('auth/me').then(response => response.data)
    }
}
