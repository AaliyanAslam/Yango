import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define type for location
type LocationType = {
  lat: number | null;
  lng: number | null;
};

// Define state type
type LocationState = {
  location: LocationType | null;
};

// Initial state
const initialState: LocationState = {
  location: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationType>) => {
      state.location = action.payload;
    },
    clearLocation: (state) => {
      state.location = { lat: null, lng: null }; // ✅ Now this is valid
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;

export default locationSlice.reducer;
