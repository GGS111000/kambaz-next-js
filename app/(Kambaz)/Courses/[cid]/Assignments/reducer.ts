import { createSlice } from "@reduxjs/toolkit";
import { assignments as assignmentsFromDB } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignmentsFromDB,
};

const defaults = {
  description:
    "The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.",
  points: 100,
  due: "2025-05-13T23:59",
  availableFrom: "2025-05-06T00:00",
  availableUntil: "",
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }) => {
      // payload: { title, course }
      const { title, course } = payload;
      const newA = {
        _id: uuidv4(),
        title,
        course,
        ...defaults,
      };
      state.assignments = [...state.assignments, newA] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
