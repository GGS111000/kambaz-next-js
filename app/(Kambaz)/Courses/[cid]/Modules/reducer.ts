// app/(Kambaz)/Courses/[cid]/Modules/reducer.ts
"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type Module = {
  _id: string;
  name: string;
  course: string;
  editing?: boolean;
};

const initialState: { modules: Module[] } = { modules: [] }; // ← 不从 Database 导入

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, { payload }: PayloadAction<{ name: string; course: string }>) => {
      state.modules.push({
        _id: uuidv4(),
        name: payload.name,
        course: payload.course,
      });
    },
    deleteModule: (state, { payload }: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== payload);
    },
    editModule: (state, { payload }: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === payload ? { ...m, editing: true } : { ...m, editing: false }
      );
    },
    updateModule: (state, { payload }: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === payload._id ? { ...payload, editing: false } : m
      );
    },
  },
});

export const { addModule, deleteModule, editModule, updateModule } =
  modulesSlice.actions;

export default modulesSlice.reducer;
