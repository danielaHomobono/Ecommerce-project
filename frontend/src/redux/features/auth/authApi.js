import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from "../../../utils/baseURL"


const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth/`,
        credentials: "include",
    }),
    tagTypes: ["User"],


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
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
                //body: credentials,
            }),
        }),
        editProfile: builder.mutation({
            query: (profileData) => ({
                url: "/edit-profile",
                method: "PATCH",
                body: profileData,
            }),
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/user/${userId}`,
                method: "DELETE",               
            }),
            invalidatesTags: ["Users"],
        }),
        getUsers: builder.query({
            query: () => ({
                url: "/users",
                method: "GET",
                
            }),
            refetchOnMount: true,
            //invalidatesTags: ["Users"],
            providesTags: ["User"],

        }),
        updateUserRole: builder.mutation({
            query: ({userId, role}) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body: {role},
            }),
            refetchOnMount: true,
            invalidatesTags: ["User"],
        }),
        
    }),

 
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useEditProfileMutation,
    useDeleteUserMutation,
    useGetUsersQuery,
    useUpdateUserRoleMutation,
} = authApi;

export default authApi;