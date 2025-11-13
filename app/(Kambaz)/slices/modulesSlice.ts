/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 不依赖 uuid，避免环境差异；足够独特就行
const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export type Module = {
  _id: string;
  name: string;
  course: string;     // ← 所属课程ID（渲染时按它过滤）
  lessons?: any[];
  editing?: boolean;
};

type AddPayload = { name: string; course: string };

const initialState: { modules: Module[] } = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule(state, { payload }: PayloadAction<AddPayload>) {
      state.modules.push({
        _id: genId(),
        name: payload.name,
        course: String(payload.course),
        lessons: [],
        editing: false,
      });
    },
    deleteModule(state, { payload: moduleId }: PayloadAction<string>) {
      state.modules = state.modules.filter((m) => m._id !== moduleId);
    },
    updateModule(state, { payload: module }: PayloadAction<Module>) {
      state.modules = state.modules.map((m) =>
        m._id === module._id ? { ...m, ...module } : m
      );
    },
    editModule(state, { payload: moduleId }: PayloadAction<string>) {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;

export default modulesSlice.reducer;
