import axios from "axios";

// const baseUrl = `${import.meta.env.BACKEND_URL} || /api/products`;
const baseUrl = `/api/products`;

const productApiInstance = axios.create ({
    baseURL: baseUrl,
    withCredentials: true
});

export const createProductApi = async(formData) => {
    const response = await productApiInstance.post("/create", formData);
    return response.data;
}

export const getAllSellerProductsApi = async() => {
    const response = await productApiInstance.get("/seller/products");
    return response.data;
}

export const getAllProductsApi = async() => {
    const response = await productApiInstance.get("/");
    return response.data;
}
