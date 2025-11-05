"use client";

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";

// 课程（你已有）
import coursesReducer from "./Courses/reducer";

// ✅ 模块 & 作业（按课件路径）
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";

// Account & Enrollments
import accountReducer from "./Account/reducer";
import enrollmentReducer from "./Enrollments/EnrollmentReducer";

// try to hydrate enrollments from localStorage on client
let preloadedState: any = {};
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem("kambaz_enrollments");
    if (raw) {
      const parsed = JSON.parse(raw);
      preloadedState = {
        enrollment: { enrollments: parsed },
      };
    }
  } catch (e) {
    // ignore
  }
}

// suppress narrow typing conflicts in this small app wiring
// @ts-expect-error
export const store = configureStore({
  reducer: {
    // primary keys
    account: accountReducer,
    courses: coursesReducer,
    modulesReducer,
    assignmentsReducer,
    enrollment: enrollmentReducer,
    // compatibility keys used elsewhere in the codebase
    accountReducer: accountReducer,
    enrollmentReducer: enrollmentReducer,
    // 兼容旧选择器（有的页面用 state.modules / state.assignments）
    modules: modulesReducer,
    assignments: assignmentsReducer,
  },
  preloadedState,
});

// Persist enrollments to localStorage when they change
let lastEnrollmentsJson: string | null = null;
store.subscribe(() => {
  try {
    const state: any = store.getState();
  const e = state.enrollment?.enrollments || [];
    const json = JSON.stringify(e);
    if (json !== lastEnrollmentsJson) {
      lastEnrollmentsJson = json;
      if (typeof window !== "undefined") {
        localStorage.setItem("kambaz_enrollments", json);
      }
    }
  } catch (err) {
    // ignore
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
