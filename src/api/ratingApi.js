import baseApi, {createApiWithToken} from "./apiConfig";

export const getBookRatings = async (token, bookId, page, size) => {
    const api = createApiWithToken(token)
    const response = await api.get(`/ratings/${bookId}`, {
        params: {
            page,
            size
        }
    })
    return response.data
}

export const getMyRating = async (token, bookId) => {
    const api = createApiWithToken(token)
    const response = await api.get("/ratings/my-rating", {
        params: {
            bookId: bookId
        }
    })
    return response.data
}

export const rateThisBook = async (token, requestData) => {
    const api = createApiWithToken(token)
    const response = await api.post("/ratings/rate", requestData)
    return response.data
}

export const counting = async (bookId) => {
    const response = await baseApi.get('/ratings/count', {
        params: {
            bookId : bookId
        }
    })
    return response.data
}