import baseApi from "./apiConfig"

export const userLogin = async (credentials) => {
    const response = await baseApi.post("/auth/token", credentials)
    return response.data
}

export const userLogout = async (token) => {
    const response = await baseApi.post("/auth/logout", token)
    return response.data
}

export const refreshToken = async (token) => {
    const response = await baseApi.post("auth/refresh", token)
    return response.data
}

