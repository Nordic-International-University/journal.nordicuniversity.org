import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { articleApi } from "@/lib/query/article.query";
import navbarReducer from "@/lib/slice/navbar.slice";
import aboutReducer from "@/lib/slice/about.slice";
import { volumeApi } from "@/lib/query/volume.query";
import { newsApi } from "@/lib/query/news.query";
import { categoryApi } from "@/lib/query/category.query";
import {registerApi} from "@/lib/query/register.query";

const rootReducer = combineReducers({
  navbar: navbarReducer,
  about: aboutReducer,
  [volumeApi.reducerPath]: volumeApi.reducer,
  [registerApi.reducerPath]: registerApi.reducer,
  [articleApi.reducerPath]: articleApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
});

const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        articleApi.middleware,
        registerApi.middleware,
        volumeApi.middleware,
        newsApi.middleware,
        categoryApi.middleware,
      ),
  });
};

const Store = makeStore();

export default Store;
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
