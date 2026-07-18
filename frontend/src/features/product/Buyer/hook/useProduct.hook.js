import { useDispatch } from "react-redux";
import { setError, setLoading, setProducts } from "../../state/product.slice";
import { getAllProductsApi, getProductByIdApi } from "../../services/product.api";

export const useProduct = () => {
    const dispatch = useDispatch();

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

    // Fetch a single product for the detail page. A single product doesn't belong
    // in the shared `products` array, so this returns it and lets the page own its
    // own loading / error / not-found state. Throws so the page can branch on it.
    async function handleGetProductById(id) {
        const response = await getProductByIdApi(id);
        return response.product;
    }

    return {
        handleAllBuyerProducts,
        handleGetProductById,
    };

}