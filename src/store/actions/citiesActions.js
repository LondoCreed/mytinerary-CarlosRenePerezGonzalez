import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setSearchTerm = createAction("CITIES/SET_SEARCH");

export const fetchCities = createAsyncThunk(
  "CITIES/AXIOS_CITIES",
  async (searchTerm = '', { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cities`, {
        params: { name: searchTerm }
      });
      return response.data.response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred while fetching cities'
      );
    }
  }
);

export const fetchCityDetails = createAsyncThunk(
  "CITIES/AXIOS_CITY_DETAILS", 
  async (id, { rejectWithValue}) => {
    try {
      const cityResponse = await axios.get(`http://localhost:8080/api/cities/id/${id}`);
      const itinerariesResponse = await axios.get(`http://localhost:8080/api/itineraries/byCity/${id}`);
      return {
        city: cityResponse.data.response,
        itineraries: itinerariesResponse.data.response
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred while fetching city details'
      );
    }
  }
);

export const updateItineraryLikes = createAsyncThunk(
  "CITIES/UPDATE_ITINERARY_LIKES",
  async ({ itineraryId, action = 'add' }, { rejectWithValue }) => {
      try {
          const response = await axios.put(
              `http://localhost:8080/api/itineraries/like/${itineraryId}?action=${action}`
          );
          
          if (response.data.success) {
              return response.data.response;
          } else {
              return rejectWithValue(response.data.message);
          }
      } catch (error) {
          return rejectWithValue(
              error.response?.data?.message || 'An error occurred while updating likes'
          );
      }
  }
);
