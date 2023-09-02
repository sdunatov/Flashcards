import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
            providesTags: ['User']
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            }),
            providesTags: ['User']
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            }),
            providesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            }),
            providesTags: ['User']
        })
    })
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = usersApiSlice;