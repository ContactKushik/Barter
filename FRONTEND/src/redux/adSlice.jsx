import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios"; // Axios instance with withCredentials: true

// ✅ Fetch all ads
export const fetchAds = createAsyncThunk(
  "ads/fetchAds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/home");
      console.log(response.data.data);
      return response.data.data; // Extract ads from response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch ads"
      );
    }
  }
);

// ✅ Fetch ads by user ID
export const fetchUserAds = createAsyncThunk(
  "ads/fetchUserAds",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/ads/${userId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user ads"
      );
    }
  }
);

// ✅ Create a new ad (User must be authenticated)
export const createAd = createAsyncThunk(
  "ads/createAd",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/home/create", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Required for file uploads
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create ad"
      );
    }
  }
);

// ✅ Delete an ad
export const deleteAd = createAsyncThunk(
  "ads/deleteAd",
  async (adId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/ads/${adId}`);
      return adId; // Return the deleted ad ID to update state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete ad"
      );
    }
  }
);

// ✅ Deactivate (Mark as 'sold')
export const deactivateAd = createAsyncThunk(
  "ads/deactivateAd",
  async (adId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/ads/deactivate/${adId}`);
      return response.data.data; // Return updated ad
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to deactivate ad"
      );
    }
  }
);

// ✅ Slice Definition
const adSlice = createSlice({
  name: "ads",
  initialState: {
    ads: [],
    userAds: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.loading = false;
        state.ads = action.payload;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserAds.fulfilled, (state, action) => {
        state.userAds = action.payload;
      })
      .addCase(createAd.fulfilled, (state, action) => {
        state.ads.push(action.payload);
      })
      .addCase(deleteAd.fulfilled, (state, action) => {
        state.ads = state.ads.filter((ad) => ad._id !== action.payload);
      })
      .addCase(deactivateAd.fulfilled, (state, action) => {
        const index = state.ads.findIndex(
          (ad) => ad._id === action.payload._id
        );
        if (index !== -1) state.ads[index] = action.payload;
      });
  },
});

export default adSlice.reducer;
