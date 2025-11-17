/* eslint-disable @typescript-eslint/no-explicit-any */
/* app/(Kambaz)/Courses/reducer.ts */
"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 用 any 避免一堆 never 错误，先保证能跑
export type Course = any;

export interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // ★ 给 Dashboard 用的：一次性把课程列表塞进来
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    // 新增一门课（比如 Add 按钮）
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    // 删除课程
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(
        (c) => c._id !== action.payload
      );
    },
    // 更新课程
    updateCourse: (state, action: PayloadAction<Course>) => {
      const updated = action.payload;
      state.courses = state.courses.map((c) =>
        c._id === updated._id ? updated : c
      );
    },
  },
});

export const {
  setCourses,
  addCourse,
  deleteCourse,
  updateCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;
