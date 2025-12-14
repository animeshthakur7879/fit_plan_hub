import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mplanService from "./mplanService";

const mplanSlice = createSlice({
  name: "mplans",
  initialState : {
    mplans : [] ,
    allPlans : [] ,
    plan : {} ,
    isLoading : false ,
    isSuccess : false ,
    isError : false ,
    message : "" ,
  } ,
  reducers: {},
  extraReducers: (builder) => {}
});

export const showMyPlans = createAsyncThunk(
  "plans/showMyPlans",
  async(_ , thunkAPI) => {
    let token = thunkAPI.getState().mauth.muser.token;
    let id = thunkAPI.getState().mauth.muser.id;
    // console.log(id ,token)
    try {
        return await mplanService.getTrainerPlans(id , token);
    } catch (error) {
        const message = error.reponse.data.message
        thunkAPI.rejectWithValue(message);
    }
  }
);

export const  addPlan = createAsyncThunk(
  "plans/createPlan",
  async(formData , thunkAPI) => {
    try {
        return await mplanService.addPlan(formData);
    } catch (error) {
        const message = error.reponse.data.message
        thunkAPI.rejectWithValue(message);
    }
  }
)




export default mplanSlice.reducer;