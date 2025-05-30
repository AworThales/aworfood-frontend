import {configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";

import { foodApi } from "./api/foodApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { orderApi } from "./api/orderApi";

export const store = configureStore({
    reducer: {
        auth: userReducer,
        cart: cartReducer,
        [foodApi.reducerPath]: foodApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([
            foodApi.middleware, 
            authApi.middleware, 
            userApi.middleware,
            orderApi.middleware,
        ])
})