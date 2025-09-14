//authApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { User } from "./authSlice";

// Define the login response type to match LoginPayload in authSlice
interface LoginResponse {
    user: User;
    token: string;
}

// baseQuery imported above includes auth header

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
