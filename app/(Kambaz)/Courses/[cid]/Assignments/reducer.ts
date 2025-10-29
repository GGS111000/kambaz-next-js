// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";
// // import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// // import assignmentsSeed from "../../../Database/assignments.json";
// // import { v4 as uuidv4 } from "uuid";

// // export type Assignment = {
// //   _id: string;
// //   course: string;
// //   name: string;
// //   description: string;
// //   points: number;
// //   dueDate: string;
// //   availableFrom?: string;
// //   availableUntil?: string;
// // };

// // const initialState: { assignments: Assignment[] } = {
// //   assignments: (assignmentsSeed as unknown as Assignment[]) ?? [],
// // };

// // const slice = createSlice({
// //   name: "assignments",
// //   initialState,
// //   reducers: {
// //     addAssignment: (
// //       state,
// //       { payload }: PayloadAction<Omit<Assignment, "_id"> & Partial<Assignment>>
// //     ) => {
// //       state.assignments.push({
// //         _id: uuidv4(),
// //         course: payload.course!,
// //         name: payload.name ?? "New Assignment",
// //         description: payload.description ?? "",
// //         points: payload.points ?? 100,
// //         dueDate: payload.dueDate ?? new Date().toISOString().slice(0, 10),
// //         availableFrom: payload.availableFrom ?? new Date().toISOString().slice(0, 10),
// //         availableUntil: payload.availableUntil ?? new Date().toISOString().slice(0, 10),
// //       });
// //     },
// //     updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
// //       state.assignments = state.assignments.map((a) =>
// //         a._id === payload._id ? payload : a
// //       );
// //     },
// //     deleteAssignment: (state, { payload: id }: PayloadAction<string>) => {
// //       state.assignments = state.assignments.filter((a) => a._id !== id);
// //     },
// //   },
// // });

// // export const { addAssignment, updateAssignment, deleteAssignment } = slice.actions;
// // export default slice.reducer;
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import assignmentsSeed from "../../../Database/assignments.json";
// import { v4 as uuidv4 } from "uuid";

// export type Assignment = {
//   _id: string;
//   course: string;
//   name: string;
//   description: string;
//   points: number;
//   dueDate: string;
//   availableFrom?: string;
//   availableUntil?: string;
// };

// const initialState: { assignments: Assignment[] } = {
//   assignments: (assignmentsSeed as unknown as Assignment[]) ?? [],
// };

// const slice = createSlice({
//   name: "assignments",
//   initialState,
//   reducers: {
//     addAssignment: (
//       state,
//       { payload }: PayloadAction<Omit<Assignment, "_id">>
//     ) => {
//       state.assignments.push({ _id: uuidv4(), ...payload });
//     },
//     updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
//       state.assignments = state.assignments.map((a) =>
//         a._id === payload._id ? payload : a
//       );
//     },
//     deleteAssignment: (state, { payload: id }: PayloadAction<string>) => {
//       state.assignments = state.assignments.filter((a) => a._id !== id);
//     },
//   },
// });

// export const { addAssignment, updateAssignment, deleteAssignment } = slice.actions;
// export default slice.reducer;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { assignments as seed } from "../../../Database"; // <- from Database/index.ts

export type Assignment = {
  _id: string;
  title: string;
  description?: string;
  points?: number;
  dueDate?: string;        // YYYY-MM-DD
  availableFrom?: string;  // YYYY-MM-DD
  availableUntil?: string; // YYYY-MM-DD
  course: string;          // course id
};

const initialState: { assignments: Assignment[] } = {
  assignments: seed as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }: { payload: Omit<Assignment, "_id"> & { _id?: string } }) => {
      const _id = payload._id ?? uuidv4();
      state.assignments = [...state.assignments, { ...payload, _id }];
    },
    updateAssignment: (state, { payload }: { payload: Assignment }) => {
      state.assignments = state.assignments.map((a) => (a._id === payload._id ? payload : a));
    },
    deleteAssignment: (state, { payload: id }: { payload: string }) => {
      state.assignments = state.assignments.filter((a) => a._id !== id);
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
