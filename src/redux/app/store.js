import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "../feature/contactSlice";

export const store = configureStore({
    reducer : {
        contact: contactSlice,
    }
})