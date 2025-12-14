import { createAsyncThunk } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import mauthService from "./mauthService";

const mauthSlice = createSlice({
    name: "mauth",
    initialState: {
        user : JSON.parse(localStorage.getItem("user")) || null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: "",
    } , 
    reducers : {} ,
    extraReducers: (builder) => {}
        
        
})

export default mauthSlice.reducer;

export const register = createAsyncThunk(
    "mauth/register",
    async (formData, thunkAPI) => {
        try {
            return await mauthService.register(formData);
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message);
        }
    }
)