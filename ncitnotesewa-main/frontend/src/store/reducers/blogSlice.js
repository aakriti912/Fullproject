import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import api from "../../config/api";

const initialState = {
    data: [],
    responseStatus: "",
    responseMessage: "",
};

export const insertBlog = createAsyncThunk(
    "blogs/insertBlog",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.post("/blogs", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getBlog = createAsyncThunk(
    "blogs/getBlog", async () => {
        try {
            const {data} = await api.get("/blogs");
            return data.blogs;
        } catch (error) {
            return error.response.data.message;
        }
    });

export const updateBlog = createAsyncThunk(
    "blogs/updateBlog",
    async (object) => {
        try {
            const {data} = await api.put("/blogs", object);
            return data;
        } catch (error) {
            return error.response.data.message;
        }
    });


export const deleteBlog = createAsyncThunk(
    "blogs/deleteBlog",
    async (id, {rejectWithValue}) => {
        try {
            await api.delete(`/blogs/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: {
        [insertBlog.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [insertBlog.fulfilled]: (state, action) => {
            return {
                ...state,
                tasks: [...state.data, action.payload],
                responseStatus: "success",
                responseMessage: "blogs created successfully",
            };
        },
        [insertBlog.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [getBlog.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getBlog.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getBlog.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },

        [deleteBlog.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [deleteBlog.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.filter((data) => data._id !== action.payload),
                responseStatus: "success",
            };
        },
        [deleteBlog.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [updateBlog.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [updateBlog.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.map((data) =>
                    data.id === action.payload._id ? action.payload : data
                ),
                responseStatus: "success",
                responseMessage: "Task updated successfully",
            };
        },
        [updateBlog.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
    },
});

export default blogSlice;

