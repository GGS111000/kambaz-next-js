/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 保底 ID（不依赖 uuid）
const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export type Assignment = {
  _id: string;
  course: string;            // 所属课程 ID（！！！列表会按它过滤）
  title: string;
  description?: string;
  points?: number;
  due?: string;              // "2025-05-13T23:59"
  availableFrom?: string;    // "2025-05-06T00:00"
  availableUntil?: string;   // ""
  editing?: boolean;
};

type AddPayload = {
  course: string;
  title: string;
  description?: string;
  points?: number;
  due?: string;
  availableFrom?: string;
  availableUntil?: string;
};

const initialState: { assignments: Assignment[] } = {
  assignments: [],
};

const slice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }: PayloadAction<AddPayload>) => {
      const a: Assignment = {
        _id: genId(),
        course: String(payload.course),
        title: payload.title,
        description:
          payload.description ??
          "Submit the link to your app landing page.",
        points: payload.points ?? 100,
        due: payload.due ?? "",
        availableFrom: payload.availableFrom ?? "",
        availableUntil: payload.availableUntil ?? "",
        editing: false,
      };
      state.assignments.push(a);
    },
    deleteAssignment: (state, { payload: id }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((x) => x._id !== id);
    },
    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((x) =>
        x._id === payload._id ? { ...x, ...payload } : x
      );
    },
    editAssignment: (state, { payload: id }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((x) =>
        x._id === id ? { ...x, editing: true } : x
      );
    },
  },
});

export const {
  addAssignment,
  updateAssignment,
  deleteAssignment,
  editAssignment,
} = slice.actions;

export default slice.reducer;
