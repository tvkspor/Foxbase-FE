import {createApiWithToken} from "./apiConfig"

export const interact = async (token, requestData) => {
    const api = createApiWithToken(token)
    const response = await api.post("/interactions/interact", requestData)
    return response.data
}

export const countInteractionsOfOneRating = async (token, requestData) => {
    const api = createApiWithToken(token)
    const response = await api.post("/interactions/count", requestData)
    return response.data
}

export const getUserInteraction = async (token, request) => {
    const api = createApiWithToken(token)
    const response = await api.post('/interactions/get', request)
    return response.data
}