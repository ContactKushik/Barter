import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios"; // or wherever your axios config is

export const createOrFetchChat = createAsyncThunk(
  "chat/createOrFetchChat",
  async ({ buyerId, sellerId, adId }, thunkAPI) => {
    try {
      const res = await axios.post("/api/chats/start", {
        buyerId,
        sellerId,
        adId,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    currentChat: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrFetchChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrFetchChat.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChat = action.payload;
      })
      .addCase(createOrFetchChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;
