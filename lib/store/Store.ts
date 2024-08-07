import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { articleApi } from "@/lib/query/article.query";

const rootReducer = combineReducers({

    [articleApi.reducerPath]: articleApi.reducer,
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(articleApi.middleware) ,
    });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];