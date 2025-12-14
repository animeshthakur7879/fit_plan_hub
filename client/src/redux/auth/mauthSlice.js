import { createAsyncThunk } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import mauthService from "./mauthService";

const mauthSlice = createSlice({
    name: "mauth",
    initialState: {
        muser : JSON.parse(localStorage.getItem("user")) || null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: "",
    } , 
    reducers : {} ,
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.muser = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.muser = null;
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.muser = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.muser = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.muser = null;
        })
    }
        
        
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

export const loginUser = createAsyncThunk(
    "mauth/login",
    async (formData, thunkAPI) => {
        try {
            return await mauthService.login(formData);
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message);
        }
    }
)

export const logout = createAsyncThunk(
    "mauth/logout",
    async () => {
        try {
            return await mauthService.logout();
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message);
        }
    }
);