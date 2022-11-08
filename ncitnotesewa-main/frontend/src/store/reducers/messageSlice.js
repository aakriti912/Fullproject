import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: [],
    responseStatus: "",
    responseMessage: "",
};


export const getAllMessages = createAsyncThunk(
    "messages/getAllMessages", async () => {
        try {
           return [
                {
                    id: 1,
                    name: 'Laxmi',
                    message: 'Hello',
                    time: '10:00'

                },
                {
                    id: 2,
                    name: 'Nandira',
                    message: 'Hello',
                    time: '10:00'
                }
            ];

        } catch (error) {
            return error.response.data.message;
        }
    });


const messageSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllMessages.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getAllMessages.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getAllMessages.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },


    },
});

export default messageSlice;

