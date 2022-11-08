import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import api from "../../config/api";

const initialState = {
    data: [],
    responseStatus: "",
    responseMessage: "",
};


export const getAuthUser = createAsyncThunk(
    "auth/getAuthUser",
    async (userId, {rejectWithValue}) => {
        try {
            const {data} = await api.get(`/users/${userId}`);
            return data.users;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    });


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {

        [getAuthUser.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getAuthUser.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getAuthUser.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
    },
});

export default authSlice;

