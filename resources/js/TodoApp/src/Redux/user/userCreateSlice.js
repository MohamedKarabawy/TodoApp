import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { setEncryptedCookie } from '../../utils/cookieUtils';

export const userCreate = createAsyncThunk(
    'auth/userCreate',
    async ({ name, email, password, password_confirmation }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/register', {
                name,
                email,
                password,
                password_confirmation,
            });

            setEncryptedCookie('data', response.data.token);
         
            return { token: response.data.token }; 
        } catch (err) {
            return rejectWithValue(err.response.data); 
        }
    }
);

const userCreateSlice = createSlice({
    name: 'userCreate',
    initialState: {
        token: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userCreate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userCreate.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token; 
                state.message = action.payload.message;
            })
            .addCase(userCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
            });
    },
});

export default userCreateSlice.reducer;