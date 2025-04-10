import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const restoreTask = createAsyncThunk(
  'tasks/restoreTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/tasks/${taskId}/restore`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const taskRestoreSlice = createSlice({
  name: 'restoreTask',
  initialState: {
    item: null, 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(restoreTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreTask.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(restoreTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskRestoreSlice.reducer;