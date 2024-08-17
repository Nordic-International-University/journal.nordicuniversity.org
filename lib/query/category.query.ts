import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://journal2.nordicun.uz" }), // Ensure this environment variable is set
  endpoints: (build) => ({
    getAllCategory: build.query({
      query: () => "/category",
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

// Export the hook generated by RTK Query
export const { useGetAllCategoryQuery } = categoryApi;