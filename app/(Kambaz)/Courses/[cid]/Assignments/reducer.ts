/* eslint-disable @typescript-eslint/no-explicit-any */
// 📄 Path: app/(Kambaz)/Courses/Assignments/reducer.ts

import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import * as db from "../../../Database";

const initialState = db.assignments;

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      const newAssignment = {
        _id: uuidv4(),
        ...action.payload
      };
      state.push(newAssignment);
    },

    deleteAssignment: (state, action) => {
      const assignmentId = action.payload;
      return state.filter((a: any) => a._id !== assignmentId);
    },

    updateAssignment: (state, action) => {
      const updatedAssignment = action.payload;
      const index = state.findIndex((a: any) => a._id === updatedAssignment._id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedAssignment };
      }
    }
  }
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
