import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import api from "../../config/api";

const initialState = {
    data: [],
    responseStatus: "",
    responseMessage: "",
};

export const createAbout = createAsyncThunk(
    "about/createAbout",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.post("/about", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAbout = createAsyncThunk(
    "about/getAbout", async () => {
        try {
            const {data} = await api.get("/about");
            return data.abouts;
        } catch (error) {
            return error.response.data.message;
        }
    });


export const updateAbout = createAsyncThunk(
    "about/updateAbout",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.put("/about", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteAbout = createAsyncThunk(
    "about/deleteAbout",
    async (id, {rejectWithValue}) => {
        try {
            await api.delete(`/about/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


const aboutSlice = createSlice({
    name: "about",
    initialState,
    reducers: {},
    extraReducers: {
        [createAbout.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [createAbout.fulfilled]: (state, action) => {
            return {
                ...state,
                tasks: [...state.data, action.payload],
                responseStatus: "success",
                responseMessage: "about created successfully",
            };
        },
        [createAbout.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [getAbout.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getAbout.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getAbout.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },

        [deleteAbout.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [deleteAbout.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.filter((data) => data._id !== action.payload),
                responseStatus: "success",
            };
        },
        [deleteAbout.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [updateAbout.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [updateAbout.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.map((data) =>
                    data.id === action.payload._id ? action.payload : data
                ),
                responseStatus: "success",
                responseMessage: "about updated successfully",
            };
        },
        [updateAbout.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
    },
});

export default aboutSlice;

