"use client";
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";

export const store = configureStore({
  reducer: {
    accountReducer,
    coursesReducer,
    modulesReducer,
    modules: modulesReducer,          // ✅ 多加一层别名
    assignmentsReducer,
    assignments: assignmentsReducer,  // ✅ 同理
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

// 🔍 调试用：浏览器可访问 Redux 状态
if (typeof window !== "undefined") {
  // @ts-expect-error: attach store for dev-time debugging
window.__REDUX_STORE__ = store;

}
