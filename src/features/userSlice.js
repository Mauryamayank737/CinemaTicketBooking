import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    name: "",
    email: "",
    avatar: "",
    last_login_date: null,
    mobile: null,
    orderHistory: [],
    role: "USER",
    shopping_cart: [],
    verify_email: false,
    status: "active"
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.avatar = action.payload.avatar
            state.mobile = action.payload.mobile
            state.role = action.payload.role
            state.orderHistory = action.payload.orderHistory
            state.shopping_cart = action.payload.shopping_cart
            state.last_login_date = action.payload.last_login_date
            state.verify_email = action.payload.verify_email
            state.status = action.payload.status ?? state.status
        }
    }
})

export const { setUserDetails } =userSlice.actions

export default userSlice.reducer