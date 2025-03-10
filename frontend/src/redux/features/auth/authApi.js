import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from "../../../utils/baseURL"


const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth/`,
        credentials: "include",
    }),


    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: "POST",
                body: newUser,
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
        }),
        editProfile: builder.mutation({
            query: (user) => ({
                url: "/edit-profile",
                method: "PATCH",
                body: user,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE",
            }),
        }),
        getUsers: builder.query({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
        }),
        updateUserRole: builder.mutation({
            query: ({id, role}) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: {role},
            }),
        }),
    }),

 
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutMutation,
    useEditProfileMutation,
    useDeleteUserMutation,
    useGetUsersQuery,
    useUpdateUserRoleMutation,
} = authApi;

export default authApi;