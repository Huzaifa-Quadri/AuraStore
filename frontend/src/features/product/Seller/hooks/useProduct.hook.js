import { useDispatch } from "react-redux";
import { uploadImagesApi, createProductApi, getAllSellerProductsApi, getAllProductsApi } from "../../services/product.api";
import { setSellerProducts, setProducts, setLoading, setError } from "../../state/product.slice";

export const useProduct = () => {
    const dispatch = useDispatch();

    // PHASE 1 — upload one group of File objects, return the receipts [{url,fileId,name}].
    // Throws on failure so the page's orchestration can stop and let the user retry.
    async function handleUploadImages(files) {
        const formData = new FormData();
        files.forEach((file) => formData.append("images", file));
        const response = await uploadImagesApi(formData);
        return response.images;
    }

    // PHASE 2 — create the product from an assembled JSON body. Throws on failure.
    async function handleCreateProduct(body) {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const response = await createProductApi(body);
            // Refresh seller list after a successful create so the new product appears.
            const list = await getAllSellerProductsApi();
            dispatch(setSellerProducts(list.products));
            return response;
        } catch (error) {
            const message = error?.response?.data?.message || "Network error. Please try again.";
            dispatch(setError(message));
            throw error;
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

    return {
        handleUploadImages,
        handleCreateProduct,
        handleGetAllSellerProducts,
    };
};

export default useProduct;
