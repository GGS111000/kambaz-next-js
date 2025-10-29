"use client";
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

// 初始化：从 db 中获取 enrollments 数据
const initialState = {
  enrollments: db.enrollments,
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    toggleEnrollment: (state, action) => {
      const { userId, courseId } = action.payload;
      const exists = state.enrollments.find(
        (enr) => enr.user === userId && enr.course === courseId
      );
      if (exists) {
        state.enrollments = state.enrollments.filter(
          (enr) => !(enr.user === userId && enr.course === courseId)
        );
      } else {
        state.enrollments.push({ user: userId, course: courseId });
      }
    },
  },
});

export const { toggleEnrollment } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
