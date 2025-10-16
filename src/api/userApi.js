import baseApi, { createApiWithToken } from "./apiConfig";

export const register = async (userInfo) => {
    const response = await baseApi.post("/users/register", userInfo)
    return response.data
}

export const getUserInfo = async (token) => {
    const api = createApiWithToken(token)
    const response = await api.get("/users/my-info")
    return response.data
}

export const requestSecurityOTP = async (requestData) => {
    const response = await baseApi.post("/users/request-otp", requestData)
    return response.data
}

export const verifySecurityOTP = async (requestData) => {
    const response = await baseApi.post("/users/verify-otp", requestData)
    return response.data
}

export const resetPassword = async (requestData) => {
    const response = await baseApi.post("/users/reset-password", requestData)
    return response.data
}