import { useDispatch } from "react-redux";
import { createProductApi, getAllSellerProductsApi} from "../services/product.api";
import {setSellerProducts,setLoading, setError} from "../state/product.slice";

export const useProduct = () => {
    const dispatch = useDispatch();

    async function handleCreateProduct(formData) {
        try{
            dispatch(setLoading(true));
            const response = await createProductApi(formData);
            dispatch(setSellerProducts(response.data.products));
        }
        catch (error) {
            const message = error?.response?.data?.message || "Network error. Please try again.";
            dispatch(setError(message));
            return error.response?.data || { success: false, message };
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetAllSellerProducts() {
        try{
            dispatch(setLoading(true));
            const response = getAllSellerProductsApi();
            dispatch(setSellerProducts(response.data.products));
        }
        catch (error) {
            const message = error?.response?.data?.message || "Network error. Please try again.";
            dispatch(setError(message));
            return error.response?.data || { success: false, message };
        }
        finally {
            dispatch(setLoading(false));
        }
    }

	return{
		handleCreateProduct,
		handleGetAllSellerProducts
	}
}

export default useProduct;
