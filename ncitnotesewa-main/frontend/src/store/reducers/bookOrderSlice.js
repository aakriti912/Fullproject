import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import api from "../../config/api";

const initialState = {
    data: [],
    responseStatus: "",
    responseMessage: "",
};

export const orderBook = createAsyncThunk(
    "book/orderBook",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.post("/books/book-order", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getBookOrderListByLoginUser = createAsyncThunk(
    "book/getBookOrderListByLoginUser",
    async (userId, {rejectWithValue}) => {
        try {
            const {data} = await api.get(`/books/book-order-by-login-user/${userId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    })

const bookOrderSlice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: {
        [orderBook.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [orderBook.fulfilled]: (state, action) => {
            return {
                ...state,
                tasks: [...state.data, action.payload],
                responseStatus: "success",
                responseMessage: "book Order successfully",
            };
        },
        [orderBook.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [getBookOrderListByLoginUser.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getBookOrderListByLoginUser.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload.books,
                responseStatus: "success",
                responseMessage: "book Order successfully",
            };
        },
        [getBookOrderListByLoginUser.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        }
    },
});

export default bookOrderSlice;

