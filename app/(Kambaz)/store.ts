"use client";

import { configureStore } from "@reduxjs/toolkit";

// 课程（你已有）
import coursesReducer from "./Courses/reducer";

// ✅ 模块 & 作业（按课件路径）
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";

export const store = configureStore({
  reducer: {
    coursesReducer,
    // 主键
    modulesReducer,
    assignmentsReducer,
    // 兼容旧选择器（有的页面用 state.modules / state.assignments）
    modules: modulesReducer,
    assignments: assignmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
