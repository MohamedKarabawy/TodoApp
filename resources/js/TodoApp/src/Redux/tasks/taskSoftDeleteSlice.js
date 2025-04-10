import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const softDeleteTask = createAsyncThunk(
  'tasks/softDeleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}/delete`);
      return { id: taskId, ...response.data }; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const taskSoftDeleteSlice = createSlice({
  name: 'softDeleteTask',
  initialState: {
    item: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(softDeleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(softDeleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(softDeleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSoftDeleteSlice.reducer;
