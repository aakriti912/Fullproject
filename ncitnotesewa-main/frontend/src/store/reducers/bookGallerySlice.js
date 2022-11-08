import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import api from "../../config/api";

const initialState = {
    data: [],
    responseStatus: "",
    responseMessage: "",
};

export const addBookImage = createAsyncThunk(
    "gallery/addBookImage",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.post("/books/book-gallery", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getBookImages = createAsyncThunk(
    "gallery/getBookImages",
    async (bookId) => {
        try {
            const {data} = await api.get(`/books/book-gallery/${bookId}`);
            return data.bookGallery;
        } catch (error) {
            return error.response.data.message;
        }
    });


export const updateBookImage = createAsyncThunk(
    "gallery/updateBookImage",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.put("/book-gallery", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteBookImage = createAsyncThunk(
    "gallery/deleteBookImage",
    async (id, {rejectWithValue}) => {
        try {
            await api.delete(`/book-gallery/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


const bookGallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {},
    extraReducers: {
        [addBookImage.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [addBookImage.fulfilled]: (state, action) => {
            return {
                ...state,
                tasks: [...state.data, action.payload],
                responseStatus: "success",
                responseMessage: "images created successfully",
            };
        },
        [addBookImage.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [getBookImages.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getBookImages.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getBookImages.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },

        [deleteBookImage.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [deleteBookImage.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.filter((data) => data._id !== action.payload),
                responseStatus: "success",
            };
        },
        [deleteBookImage.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [updateBookImage.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [updateBookImage.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.map((data) =>
                    data.id === action.payload._id ? action.payload : data
                ),
                responseStatus: "success",
                responseMessage: "Task updated successfully",
            };
        },
        [updateBookImage.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
    },
});

export default bookGallerySlice;

