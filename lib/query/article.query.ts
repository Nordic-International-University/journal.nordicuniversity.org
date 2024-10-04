import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const articleApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        cache: 'no-cache'
    }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => "/article/necessary?articles=6&topArticles=2&lastArticles=8",
        }),
        getBySlug: builder.query({
            query: (slug) => `/article/user/slug/${slug}`,
        }),
        getByCategory: builder.query({
            query: (id) => `/article/user/category/${id}`,
        }),
        getSubcategoriesByCategory: builder.query({
            query: (categoryId) => `/subcategory/sub/${categoryId}`,
        }),
    }),
});

export const {useGetPostsQuery, useGetBySlugQuery, useGetByCategoryQuery, useGetSubcategoriesByCategoryQuery} =
    articleApi;
