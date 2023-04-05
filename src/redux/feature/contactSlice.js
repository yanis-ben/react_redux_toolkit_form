import { createSlice } from "@reduxjs/toolkit"
import {contactData} from "../../pages/Home"

export const contactSlice = createSlice({
    name: "contact",
    initialState: {
        contacts : contactData,
        filter : "All",
        contact : {
            name: "",
            email: "",
            phone: "",
            status: ""
        }, 
    },
    reducers : {
        getContact : (state, action) => {
            state.contact = state.contacts.find((item) => item.id == action.payload)
        },
        addContact : (state, action) => {
            const newContact = {...action.payload, id : ((new Date).toString())};
            state.contacts = [...state.contacts, newContact]
        },
        deleteContact : (state, action) => {
            state.contacts = state.contacts.filter((item) =>  item.id !== action.payload )
        }, 
        updateContact : (state, action) => {
            state.contacts = state.contacts.map((item)  => 
            item.id === action.payload.id ? action.payload : item
            );
        },
        filterContact : (state, action) => {
            state.filter = action.payload
        }
    },
});
export const {addContact, deleteContact, updateContact, getContact, filterContact} = contactSlice.actions;
export default contactSlice.reducer;