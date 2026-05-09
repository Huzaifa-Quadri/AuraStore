import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name : "product",
    initialState : {
        products : [],
        loading : false,
        error : null
    },
    reducers : {
        setSellerProducts : (state, actions) => {
            state.products = actions.payload;
        },
        setLoading : (state, actions) => {
            state.loading = actions.payload;
        },
        setError : (state, actions) => {
            state.error = actions.payload;
        }
    }
})
export const {setSellerProducts, setLoading, setError} = productSlice.actions;
export default productSlice.reducer;