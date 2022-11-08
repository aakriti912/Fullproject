import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger'

import bookSlice from "./reducers/bookSlice";
import usersSlice from "./reducers/usersSlice";
import bannerSlice from "./reducers/bannerSlice";
import authSlice from "./reducers/authSlice";
import bookGallerySlice from "./reducers/bookGallerySlice";
import facultySlice from "./reducers/facultySlice";
import bookOrderSlice from "./reducers/bookOrderSlice";
import settingSlice from "./reducers/settingSlice";
import blogSlice from "./reducers/blogSlice";
import messageSlice from "./reducers/messageSlice";
import aboutSlice from "./reducers/aboutSlice";

const store = configureStore({
    reducer: {
        books: bookSlice.reducer,
        user: usersSlice.reducer,
        banner: bannerSlice.reducer,
        auth: authSlice.reducer,
        bookGallery: bookGallerySlice.reducer,
        faculty: facultySlice.reducer,
        bookOrder: bookOrderSlice.reducer,
        setting: settingSlice.reducer,
        blogs: blogSlice.reducer,
        message: messageSlice.reducer,
        about: aboutSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)

});

export default store;
