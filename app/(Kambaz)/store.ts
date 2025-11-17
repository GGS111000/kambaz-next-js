"use client";

import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
//import enrollmentsReducer from "./Dashboard/EnrollmentReducer";   // ★ 新增
import enrollmentsReducer from "./Enrollments/EnrollmentReducer";

export const store = configureStore({
  reducer: {
    accountReducer,
    coursesReducer,
    modulesReducer,
    assignmentsReducer,
    enrollmentsReducer,   // ★ 新增
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// dev 调试：浏览器里访问 window.__REDUX_STORE__
if (typeof window !== "undefined") {
  // @ts-expect-error dev helper
  window.__REDUX_STORE__ = store;
}
