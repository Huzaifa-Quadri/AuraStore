import axios from "axios";

// const baseUrl = `${import.meta.env.BACKEND_URL} || /api/products`;
const baseUrl = `/api/products`;

const productApiInstance = axios.create ({
    baseURL: baseUrl,
    withCredentials: true
});

// PHASE 1 — upload one group of raw files (multipart). Field name MUST be "images".
// Returns [{ url, fileId, name }, ...].
export const uploadImagesApi = async(formData) => {
    const response = await productApiInstance.post("/upload", formData);
    return response.data;
}

// PHASE 2 — create the product from JSON (url + fileId receipts embedded in body).
export const createProductApi = async(body) => {
    const response = await productApiInstance.post("/create", body);
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

export const getProductByIdApi = async(id) => {
    const response = await productApiInstance.get(`/${id}`);
    return response.data;
}
