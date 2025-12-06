import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLocation: null,
  selectedCategory: null,
  selectedSubCategory: null,
  categories: null,
};

const greenActionSlice = createSlice({
  name: "greenAction",
  initialState,
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    resetGreenActionForm: (state) => {
      state.selectedLocation = null;
      state.selectedCategory = null;
      state.selectedSubCategory = null;
    },
  },
});

export const {
  setSelectedLocation,
  setSelectedCategory,
  setSelectedSubCategory,
  setCategories,
  resetGreenActionForm,
} = greenActionSlice.actions;

export default greenActionSlice.reducer;
