import { useDispatch } from "react-redux";
import { setError, setLoading, setProducts } from "../../state/product.slice";
import { getAllProductsApi } from "../../services/product.api";

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

    return {
        handleAllBuyerProducts,
    };

}