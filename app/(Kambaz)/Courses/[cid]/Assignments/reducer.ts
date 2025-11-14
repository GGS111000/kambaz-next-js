/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AssignmentsState {
  assignments: any[];
}

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<any[]>) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action: PayloadAction<any>) => {
      state.assignments.push(action.payload);
    },
    updateAssignmentLocal: (state, action: PayloadAction<any>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },
    deleteAssignmentLocal: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  updateAssignmentLocal,
  deleteAssignmentLocal,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
