import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import urlMission from '../../utils/url';

export const getMissions = createAsyncThunk(
  'missions/getMissions',
  async (_, thunkAPI) => {
    try {
      const res = await axios(urlMission);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.data?.message || 'Cannot fetch missions...',
      );
    }
  },
);

const initialState = {
  isLoading: false,
  missions: [],
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMissions.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder
      .addCase(getMissions.fulfilled, (state, action) => ({
        ...state,
        missions: action.payload,
      }))
      .addCase(getMissions.rejected, (state) => ({
        ...state,
        isLoading: false,
      }));
  },
});

export default missionsSlice.reducer;