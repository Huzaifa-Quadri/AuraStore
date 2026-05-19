import { useDispatch } from "react-redux";
import { createProductApi, getAllSellerProductsApi, getAllProductsApi } from "../services/product.api";
import { setSellerProducts, setProducts, setLoading, setError } from "../state/product.slice";

export const useProduct = () => {
    const dispatch = useDispatch();

    async function handleCreateProduct(formData) {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const response = await createProductApi(formData);
            // Refresh seller list after a successful create so the new product appears.
            const list = await getAllSellerProductsApi();
            dispatch(setSellerProducts(list.products));
            return response;
        } catch (error) {
            const message = error?.response?.data?.message || "Network error. Please try again.";
            dispatch(setError(message));
            return error.response?.data || { success: false, message };
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetAllSellerProducts() {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const response = await getAllSellerProductsApi();
            dispatch(setSellerProducts(response.products));
        } catch (error) {
            const message = error?.response?.data?.message || "Network error. Please try again.";
            dispatch(setError(message));
            return error.response?.data || { success: false, message };
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleAllBuyerProducts() {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const response = await getAllProductsApi();
            dispatch(setProducts(response.products));
        } catch (error) {
            const message = error?.response?.data?.message || "Network error. Please try again.";
            dispatch(setError(message));
            return error.response?.data || { success: false, message };
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleCreateProduct,
        handleGetAllSellerProducts,
        handleAllBuyerProducts,
    };
};

export default useProduct;
