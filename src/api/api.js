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
        return instance.post(`follow/${userId}`)
    },
    unfollowUser (userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfileUser (userId) {
        //console.warn('Obsolete method. Please profileSpi object.')
        return profileApi.getProfileUser(userId)
    },
};

export const profileApi = {

    getProfileUser (userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatusUser (userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatusUser(status) {
        return instance.put(`profile/status/`,
            {
            status: status
        })
    },
    savePhoto (filePhoto) {

        const formData = new FormData();
        formData.append("image", filePhoto)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile (profile) {
        return instance.put(`profile`, profile)
    }
}

export const authMeApi = {
    authUser () {
        return instance.get('auth/me')
    },
    login (email, password, rememberMe = false) {
        return instance.post("auth/login", {email, password, rememberMe})
    },
    logout () {
        return instance.delete("auth/login")
    }
}
