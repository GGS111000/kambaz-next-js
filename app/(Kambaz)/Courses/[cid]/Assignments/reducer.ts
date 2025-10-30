import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments as assignmentsFromDB } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

// ✅ 定义并导出类型（供 index.ts 重导出）
export type Assignment = {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  due: string;
  availableFrom: string;
  availableUntil: string;
  editing?: boolean;
};

type AssignmentsState = {
  assignments: Assignment[];
};

const initialState: AssignmentsState = {
  assignments: assignmentsFromDB as Assignment[],
};

const defaults: Pick<
  Assignment,
  "description" | "points" | "due" | "availableFrom" | "availableUntil"
> = {
  description:
    "The assignment is available online. Submit a link to the landing page...",
  points: 100,
  due: "2025-05-13T23:59",
  availableFrom: "2025-05-06T00:00",
  availableUntil: "",
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      action: PayloadAction<{ title: string; course: string }>
    ) => {
      const { title, course } = action.payload;
      const newItem: Assignment = {
        _id: uuidv4(),
        title,
        course,
        ...defaults,
      };
      state.assignments = [...state.assignments, newItem];
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      const assignmentId = action.payload;
      state.assignments = state.assignments.filter((a) => a._id !== assignmentId);
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const updated = action.payload;
      state.assignments = state.assignments.map((a) =>
        a._id === updated._id ? updated : a
      );
    },
    editAssignment: (state, action: PayloadAction<string>) => {
      const assignmentId = action.payload;
      state.assignments = state.assignments.map((a) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      );
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
