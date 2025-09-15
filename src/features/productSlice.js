import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    allSubCategory: [],
    allCategory: [],
    allProduct: [],
};

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setAllCategory: (state, action) => {
            state.allCategory = [...action.payload.allCategory]
        },
        setAllSubCategory: (state, action) => {
            state.allSubCategory = [...action.payload.allSubCategory]
        },
        setAllProduct: (state, action) => {
            state.allProduct = [...action.payload.allProduct]
        }
    }

})



export const { setAllCategory, setAllSubCategory, setAllProduct } = ProductSlice.actions
export default ProductSlice.reducer