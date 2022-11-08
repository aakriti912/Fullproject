import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import api from "../../config/api";

const initialState = {
    data: [],
    responseStatus: "",
    responseMessage: "",
};

export const createUser = createAsyncThunk(
    "users/createUser",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.post("/users", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getUsers = createAsyncThunk(
    "users/getUsers", async () => {
        try {
            const {data} = await api.get("/users");
            return data.users;
        } catch (error) {
            return error.response.data.message;
        }
    });

export const loginUser = createAsyncThunk(
    "users/loginUser",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.post("/login", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    });


export const updateUser = createAsyncThunk(
    "users/updateUpdate",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.put("/users", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (userId, {rejectWithValue}) => {
        try {
            await api.delete(`/users/${userId}`);
            return userId;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getUserById = createAsyncThunk(
    "users/getUserById",
    async (userId, {rejectWithValue}) => {
        try {
            const {data} = await api.get(`/users/${userId}`);
            return data.users;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    });

export const changePassword = createAsyncThunk(
    "users/changePassword",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.post("/users/change-password", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    });

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [createUser.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [createUser.fulfilled]: (state, action) => {
            return {
                ...state,
                tasks: [...state.data, action.payload],
                responseStatus: "success",
                responseMessage: "users created successfully",
            };
        },
        [createUser.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [getUsers.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getUsers.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getUsers.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },

        [deleteUser.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [deleteUser.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.filter((data) => data._id !== action.payload),
                responseStatus: "success",
            };
        },
        [deleteUser.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [updateUser.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [updateUser.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.map((data) =>
                    data.id === action.payload._id ? action.payload : data
                ),
                responseStatus: "success",
                responseMessage: "user updated successfully",
            };
        },
        [updateUser.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [loginUser.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [loginUser.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [loginUser.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [getUserById.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getUserById.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getUserById.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [changePassword.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [changePassword.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [changePassword.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        }
    },

});

export default userSlice;

