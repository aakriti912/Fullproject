import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import api from "../../config/api";

const initialState = {
    data: [],
    responseStatus: "",
    responseMessage: "",
};

export const createFaculty = createAsyncThunk(
    "faculty/createFaculty",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.post("/faculty", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getFaculty = createAsyncThunk(
    "faculty/getFaculty", async () => {
        try {
            const {data} = await api.get("/faculty");
            return data.faculty;
        } catch (error) {
            return error.response.data.message;
        }
    });


export const getFaultyById = createAsyncThunk(
    "faculty/getFaultyById", async (id) => {
        try {
            const {data} = await api.get(`/faculty/${id}`);
            return data.faculty;
        } catch (error) {
            return error.response.data.message;
        }
    });

export const updateFaculty = createAsyncThunk(
    "faculty/updateFaculty",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.put("/faculty", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteFaculty = createAsyncThunk(
    "faculty/deleteFaculty",
    async (facultyId, {rejectWithValue}) => {
        try {
            const {data} = await api.delete(`/faculty/${facultyId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateStatus = createAsyncThunk(
    "faculty/updateStatus",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.post("/faculty/status", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    });


const facultySlice = createSlice({
    name: "faculty",
    initialState,
    reducers: {},
    extraReducers: {
        [createFaculty.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [createFaculty.fulfilled]: (state, action) => {
            return {
                ...state,
                tasks: [...state.data, action.payload],
                responseStatus: "success",
                responseMessage: "Faculty created successfully",
            };
        },
        [createFaculty.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [getFaculty.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getFaculty.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getFaculty.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },

        [deleteFaculty.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [deleteFaculty.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.filter((data) => data._id !== action.payload),
                responseStatus: "success",
            };
        },
        [deleteFaculty.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [updateFaculty.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [updateFaculty.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.map((data) =>
                    data.id === action.payload._id ? action.payload : data
                ),
                responseStatus: "success",
                responseMessage: "Faculty updated successfully",
            };
        },
        [updateFaculty.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },

        [getFaultyById.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getFaultyById.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getFaultyById.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [updateStatus.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [updateStatus.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.map((data) =>
                    data.id === action.payload._id ? action.payload : data
                ),
                responseStatus: "success",
                responseMessage: "Status updated successfully",
            };
        },
        [updateStatus.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        }
    },
});

export default facultySlice;

