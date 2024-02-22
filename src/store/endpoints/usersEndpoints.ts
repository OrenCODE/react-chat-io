import {apiSlice} from "../slices/apiSlice.ts";
import {UserInfo} from "../../utils/sliceHelpers.ts";

const URL = '/users';

export const usersEndpoints = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<{ users: UserInfo[] }, void>({
            query: () => `${URL}`,
            providesTags: ['User'],
        }),
        getUserById: builder.query<UserInfo, string>({
            query: (id) => `${URL}/${id}`,
        }),
        updateUser: builder.mutation<UserInfo, { id: string; data: UserInfo }>({
            query: ({id, data}) => ({
                url: `${URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation<UserInfo, string>({
            query: (id) => ({
                url: `${URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersEndpoints;
