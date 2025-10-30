/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules as modulesFromDB } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

// ✅ 定义并导出类型，供外部 re-export 使用
export type Module = {
  _id: string;
  name: string;
  course: string;
  lessons: any[];
  editing?: boolean;
};

type ModulesState = {
  modules: Module[];
};

const initialState: ModulesState = {
  modules: modulesFromDB as Module[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action: PayloadAction<{ name: string; course: string }>) => {
      const { name, course } = action.payload;
      const newModule: Module = {
        _id: uuidv4(),
        name,
        course,
        lessons: [],
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      const moduleId = action.payload;
      state.modules = state.modules.filter((m) => m._id !== moduleId);
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      const updatedModule  = action.payload;
      state.modules = state.modules.map((m) => (m._id === updatedModule ._id ? updatedModule  : m));
    },
    editModule: (state, action: PayloadAction<string>) => {
      const moduleId = action.payload;
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } = modulesSlice.actions;
export default modulesSlice.reducer;
