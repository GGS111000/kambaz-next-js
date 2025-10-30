"use client";

import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";
import coursesReducer from "./Courses/reducer";
import enrollmentReducer from "./Enrollments/EnrollmentReducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import { modulesReducer } from "./Courses/[cid]/Modules"; 



export const store = configureStore({
  reducer: {
    accountReducer,
    coursesReducer,
    enrollmentReducer,

    assignmentsReducer,
    assignments: assignmentsReducer,  // 兼容老 selector

    // ★ 改：modules 统一注册到这一个 reducer
    modulesReducer,
    modules: modulesReducer,          // 兼容 state.modules.modules
  },
  // （preloadedState 按你原样保留）
});

// （RootState / AppDispatch 导出保持不变）
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
