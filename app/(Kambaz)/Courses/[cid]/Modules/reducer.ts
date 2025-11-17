/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createSlice } from "@reduxjs/toolkit";

// ★ Module 类型
export interface Module {
  _id?: string;
  name?: string;
  description?: string;
  lessons?: any[];
}

// ★ 给 state 指定完整类型
const initialState: { 
  modules: Module[],
  editingModule: Module | null
} = {
  modules: [],
  editingModule: null,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, action) => {
      state.modules = [...state.modules, action.payload];
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (m) => m._id !== action.payload
      );
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
    },
    editModule: (state, action) => {
      // ★ 这里必须有 editingModule，否则 TS 报错
      state.editingModule = action.payload;
    },
  },
});

export const {
  addModule,
  deleteModule,
  updateModule,
  editModule,
  setModules,
} = modulesSlice.actions;

export default modulesSlice.reducer;
