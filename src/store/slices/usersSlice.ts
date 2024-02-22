import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserInfo} from "../../utils/sliceHelpers.ts";
import {usersEndpoints} from '../endpoints/usersEndpoints';

interface UsersState {
    users: UserInfo[];
    loading: boolean;
    error: string | null;
    updateSuccess: boolean;
    deleteSuccess: boolean;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
    updateSuccess: false,
    deleteSuccess: false,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetUserState: state => {
            state.users = [];
            state.loading = false;
            state.error = null;
            state.updateSuccess = false;
            state.deleteSuccess = false;
        },
        resetUpdateSuccess: (state) => {
            state.updateSuccess = false;
        },
        resetDeleteSuccess: (state) => {
            state.deleteSuccess = false;
        },
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Handle getUsers
        builder.addMatcher(
            usersEndpoints.endpoints.getUsers.matchPending,
            (state) => {
                state.loading = true;
                state.error = null;
            }
        ).addMatcher(
            usersEndpoints.endpoints.getUsers.matchFulfilled,
            (state, action: PayloadAction<{ users: UserInfo[] }>) => {
                state.users = action.payload.users;
                state.loading = false;
            }
        ).addMatcher(
            usersEndpoints.endpoints.getUsers.matchRejected,
            (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Could not fetch users';
            }
        );

        // Handle updateUser
        builder.addMatcher(
            usersEndpoints.endpoints.updateUser.matchPending,
            (state) => {
                state.loading = true;
                state.updateSuccess = false;
                state.error = null;
            }
        ).addMatcher(
            usersEndpoints.endpoints.updateUser.matchFulfilled,
            (state) => {
                state.loading = false;
                state.updateSuccess = true;
            }
        ).addMatcher(
            usersEndpoints.endpoints.updateUser.matchRejected,
            (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Could not update user';
            }
        );

        // Handle deleteUser
        builder.addMatcher(
            usersEndpoints.endpoints.deleteUser.matchPending,
            (state) => {
                state.loading = true;
                state.deleteSuccess = false;
                state.error = null;
            }
        ).addMatcher(
            usersEndpoints.endpoints.deleteUser.matchFulfilled,
            (state) => {
                state.loading = false;
                state.deleteSuccess = true;
            }
        ).addMatcher(
            usersEndpoints.endpoints.deleteUser.matchRejected,
            (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Could not delete user';
            }
        );
    },
});

export const {
    resetUpdateSuccess,
    resetDeleteSuccess,
    resetError,
    resetUserState
} = userSlice.actions;

export default userSlice.reducer;
