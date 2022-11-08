import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import api from "../../config/api";

const initialState = {
    data: [],
    responseStatus: "",
    responseMessage: "",
};

export const createBanner = createAsyncThunk(
    "banner/createBanner",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.post("/banner", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getBanner = createAsyncThunk(
    "banner/getBanner", async () => {
        try {
            const {data} = await api.get("/banner");
            return data.banners;
        } catch (error) {
            return error.response.data.message;
        }
    });


export const updateBanner = createAsyncThunk(
    "banner/updateBanner",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.put("/banner", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteBanner = createAsyncThunk(
    "banner/deleteBanner",
    async (taskId, {rejectWithValue}) => {
        try {
            await api.delete(`/banner/${taskId}`);
            return taskId;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {},
    extraReducers: {
        [createBanner.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [createBanner.fulfilled]: (state, action) => {
            return {
                ...state,
                tasks: [...state.data, action.payload],
                responseStatus: "success",
                responseMessage: "Task created successfully",
            };
        },
        [createBanner.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [getBanner.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getBanner.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getBanner.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },

        [deleteBanner.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [deleteBanner.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.filter((data) => data._id !== action.payload),
                responseStatus: "success",
            };
        },
        [deleteBanner.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [updateBanner.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [updateBanner.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.map((data) =>
                    data.id === action.payload._id ? action.payload : data
                ),
                responseStatus: "success",
                responseMessage: "Task updated successfully",
            };
        },
        [updateBanner.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
    },
});

export default bannerSlice;

