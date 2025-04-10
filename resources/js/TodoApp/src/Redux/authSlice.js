import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';
import { setEncryptedCookie, removeCookie } from '../utils/cookieUtils';

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password, remember }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/login', { email, password, remember });
            let days = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
            if(remember)
            {
                days = 7;
            }
            setEncryptedCookie('data', response.data, days);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const logout = createAsyncThunk
('auth/logout', 
    async () => {
      try {
            const response = await axios.post('/logout');
            removeCookie('data');
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
             // login
             .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.token = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;