"use client";
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";
import { v4 as uuidv4 } from "uuid";

// Initialize from db enrollments
const initialState = {
  enrollments: db.enrollments || [],
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    // Enroll a user in a course (idempotent)
    enroll: (state, action) => {
      const { userId, courseId } = action.payload;
      const exists = state.enrollments.find(
        (enr) => enr.user === userId && enr.course === courseId
      );
      if (!exists) {
        // use immutable update so store subscribers that compare references detect the change
        state.enrollments = [
          ...state.enrollments,
          { _id: uuidv4(), user: userId, course: courseId },
        ];
      }
    },

    // Unenroll a user from a course
    unenroll: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enr) => !(enr.user === userId && enr.course === courseId)
      );
    },

    // Toggle enrollment (keeps compatibility)
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
        state.enrollments = [
          ...state.enrollments,
          { _id: uuidv4(), user: userId, course: courseId },
        ];
      }
    },
  },
});

export const { enroll, unenroll, toggleEnrollment } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
