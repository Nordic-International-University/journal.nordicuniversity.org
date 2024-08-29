import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerApi = createApi({
    reducerPath: "registerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://journal2.nordicun.uz", // Базовый URL вашего API
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/author/create", // URL для регистрации пользователя
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Устанавливаем тип контента
                },
                body: {
                    phone_number: `+${userData.number}`, // Параметры для регистрации пользователя
                    password: userData.password,
                    full_name: userData.full_name,
                    science_degree: userData.science_degree,
                    birthday: userData.birthday,
                    job: userData.job,
                    place_position: userData.place_position,
                },
            }),
        }),
        loginUser: builder.mutation({
            query: (loginData) => ({
                url: "/author/login",  // URL для авторизации пользователя
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    phone_number: `+${loginData.number}`, // Телефонный номер пользователя
                    password: loginData.password,  // Пароль пользователя
                },
            }),
        }),
    }),
});

// Экспортируем хуки для использования мутации в компонентах
export const { useRegisterUserMutation,useLoginUserMutation } = registerApi;






