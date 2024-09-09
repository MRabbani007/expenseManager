import { RootState } from "@/app/store";
import { Category, Description } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  categories: Category[] | null;
  descriptions: Description[] | null;
  selected: Partial<Description>[] | null;
};

const initialState: InitialState = {
  categories: [],
  descriptions: [],
  selected: [],
};

const globalsSlice = createSlice({
  name: "globals",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      const { payload } = action;
      return { ...state, categories: payload };
    },
    setDescriptions: (state, action: PayloadAction<Description[]>) => {
      const { payload } = action;
      return { ...state, descriptions: payload };
    },
    setSelectedDescriptions: (
      state,
      action: PayloadAction<Partial<Description>[]>
    ) => {
      const { payload } = action;
      return { ...state, selected: payload };
    },
    clearGlobals: () => initialState,
  },
});

export const {
  setCategories,
  setDescriptions,
  setSelectedDescriptions,
  clearGlobals,
} = globalsSlice.actions;

export const selectUserDescriptions = (state: RootState) =>
  state.globals.descriptions;

export const selectUserCategories = (state: RootState) =>
  state.globals.categories;

export const selectSelectedDescriptions = (state: RootState) =>
  state.globals.selected;

export default globalsSlice.reducer;
