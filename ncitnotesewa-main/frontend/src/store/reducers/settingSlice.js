import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import api from "../../config/api";

const initialState = {
    data: [],
    responseStatus: "",
    responseMessage: "",
};


export const getSetting = createAsyncThunk(
    "setting/getSetting", async () => {
        try {
            const {data} = await api.get("/setting");
            return data.settings;
        } catch (error) {
            return error.response.data.message;
        }
    });


export const updateSetting = createAsyncThunk(
    "setting/updateSetting",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.put("/setting", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {},
    extraReducers: {

        [getSetting.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getSetting.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getSetting.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },


        [updateSetting.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [updateSetting.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.map((data) =>
                    data.id === action.payload._id ? action.payload : data
                ),
                responseStatus: "success",
                responseMessage: "Setting updated successfully",
            };
        },
        [updateSetting.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
    },
});

export default settingSlice;


