"use client";
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

const initialState = {
  enrollments: db.enrollments || [],
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll(state, action) {
      const newEnrollment = {
        user: action.payload.userId,
        course: action.payload.courseId,
      };
      state.enrollments.push(newEnrollment);
    },
    unenroll(state, action) {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
