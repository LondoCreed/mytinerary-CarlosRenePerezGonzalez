import { createReducer } from "@reduxjs/toolkit";
import { 
  fetchCities, fetchCityDetails, setSearchTerm, updateItineraryLikes } from "../actions/citiesActions";

const initialState = {
  cities: [],
  city: null,
  itineraries: [],
  loading: false,
  error: null,
  searchTerm: "",
};

export const citiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCities.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCities.fulfilled, (state, action) => {
      state.cities = action.payload;
      state.loading = false;
    })
    .addCase(fetchCities.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(fetchCityDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.itineraries = [];
    })
    .addCase(fetchCityDetails.fulfilled, (state, action) => {
      state.city = action.payload.city;
      state.itineraries = action.payload.itineraries;
      state.loading = false;
    })
    .addCase(fetchCityDetails.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(setSearchTerm, (state, action) => {
      state.searchTerm = action.payload;
    })
    .addCase(updateItineraryLikes.fulfilled, (state, action) => {
      const updatedItinerary = action.payload;
      state.itineraries = state.itineraries.map(itinerary =>
        itinerary._id === updatedItinerary._id ? updatedItinerary : itinerary
      );
    });
});

export default citiesReducer;