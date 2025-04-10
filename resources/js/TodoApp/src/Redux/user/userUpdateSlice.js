import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { setEncryptedCookie, getDecryptedCookie } from '../../utils/cookieUtils';

export const userUpdate = createAsyncThunk(
    'auth/userUpdate',
    async (updatedData, { rejectWithValue }) => {
        try {
            const response = await axios.put('/user/update', updatedData);

            const cookieData = getDecryptedCookie('data');

            const updatedCookieData = {
                ...cookieData,
                user: {
                    ...cookieData.user,
                    ...response.data.user,
                }
            };

            setEncryptedCookie('data', updatedCookieData, new Date(Date.now() + 6 * 60 * 60 * 1000)); // 6 hours

            return response.data.user;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const userUpdateSlice = createSlice({
    name: 'userUpdate',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userUpdate.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.message = action.payload.message;
            })
            .addCase(userUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userUpdateSlice.reducer;