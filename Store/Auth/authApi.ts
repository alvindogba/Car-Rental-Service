//authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {RootState} from "../store";
import { User } from "./authSlice";

// Define the login response type to match LoginPayload in authSlice
interface LoginResponse {
    user: User;
    token: string;
}

const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

//create the base query and add the token to the headers
const baseQuery = fetchBaseQuery({
    baseUrl: backendUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string; password: string }>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),

        }),
        //signUp
        signUp: builder.mutation<LoginResponse, { name: string; email: string; password: string; role: string }>({
            query: (credentials) => ({
                url: "/auth/signup",
                method: "POST",
                body: credentials,
            }),
        }),

        //getCurrentUser
        getCurrentUser: builder.query<User, void>({
            query: () => ({
                url: `/auth/current-user`,
                method: "GET",
            }),
        }),

        //updateUser
        updateUser: builder.mutation<User, { id: string; name: string; email: string; password: string; role: string }>({
            query: (credentials) => ({
                url: `/auth/update-user/${credentials.id}`,
                method: "PUT",
                body: credentials,
            }),
        }),

        //deleteUser
        deleteUser: builder.mutation<User, { id: string }>({
            query: (id) => ({
                url: `/auth/delete-user/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useSignUpMutation,
    useGetCurrentUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = authApi;
