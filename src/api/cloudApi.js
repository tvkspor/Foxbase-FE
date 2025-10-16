import axios from "axios"

export const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'foxbase')
    formData.append('cloud_name', 'ddlpbdgv5')

    const response = await axios.post('https://api.cloudinary.com/v1_1/ddlpbdgv5/image/upload', formData)
    console.log(response)
    return response.data.secure_url
}





