import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import api from "../../config/api";

const initialState = {
    data: [],
    responseStatus: "",
    responseMessage: "",
};

export const createBook = createAsyncThunk(
    "book/createBook",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.post("/books", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getBooks = createAsyncThunk(
    "books/getBooks", async () => {
        try {
            const {data} = await api.get("/books");
            return data.books;
        } catch (error) {
            return error.response.data.message;
        }
    });


export const updateBook = createAsyncThunk(
    "book/updateBook",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.put("/books", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteBook = createAsyncThunk(
    "book/deleteBook",
    async (bookId, {rejectWithValue}) => {
        try {
            await api.delete(`/books/${bookId}`);
            return bookId;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getBookByLoginUser = createAsyncThunk(
    "book/getBookByLoginUser",
    async (userId, {rejectWithValue}) => {
        try {
            const {data} = await api.get(`/books/login_user_book/${userId}`)
            return data.books;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAllBookByFaculty = createAsyncThunk(
    "book/getAllBookByFaculty",
    async (facultyId, {rejectWithValue}) => {
        try {
            const {data} = await api.get(`/books/faculty_book/${facultyId}`)
            return data.books;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    });


const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: {
        [createBook.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [createBook.fulfilled]: (state, action) => {
            return {
                ...state,
                tasks: [...state.data, action.payload],
                responseStatus: "success",
                responseMessage: "book created successfully",
            };
        },
        [createBook.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [getBooks.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getBooks.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getBooks.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },

        [deleteBook.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [deleteBook.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.filter((data) => data._id !== action.payload),
                responseStatus: "success",
            };
        },
        [deleteBook.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [updateBook.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [updateBook.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.map((data) =>
                    data.id === action.payload._id ? action.payload : data
                ),
                responseStatus: "success",
                responseMessage: "book updated successfully",
            };
        },
        [updateBook.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [getBookByLoginUser.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getBookByLoginUser.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getBookByLoginUser.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [getAllBookByFaculty.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getAllBookByFaculty.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getAllBookByFaculty.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },


    },
});

export default booksSlice;

