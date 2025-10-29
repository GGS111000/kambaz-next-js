

// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { createSlice } from "@reduxjs/toolkit";
// // import { courses } from "../Database";
// // import { v4 as uuidv4 } from "uuid";
// // const initialState = {
// //  courses: courses,
// // };
// // const coursesSlice = createSlice({
// //  name: "courses",
// //  initialState,
// //  reducers: {
// //    addNewCourse: (state, { payload: course }) => {
// //      const newCourse = { ...course, _id: uuidv4() };
// //      state.courses = [...state.courses, newCourse] as any;
// //    },
// //    deleteCourse: (state, { payload: courseId }) => {
// //      state.courses = state.courses.filter(
// //        (course: any) => course._id !== courseId
// //      );
// //    },
// //    updateCourse: (state, { payload: course }) => {
// //      state.courses = state.courses.map((c: any) =>
// //        c._id === course._id ? course : c
// //      ) as any;
// //    },
// //  },
// // });
// // export const { addNewCourse, deleteCourse, updateCourse } =
// //  coursesSlice.actions;
// // export default coursesSlice.reducer;
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import assignmentsSeed from "../Database/assignments.json";
// import { v4 as uuidv4 } from "uuid";

// export type Assignment = {
//   _id: string;
//   course: string;          // course (cid)
//   name: string;
//   description: string;
//   points: number;
//   dueDate: string;         // yyyy-mm-dd
//   availableFrom?: string;  // yyyy-mm-dd
//   availableUntil?: string; // yyyy-mm-dd
// };

// const initialState: { assignments: Assignment[] } = {
//   assignments: (assignmentsSeed as unknown as Assignment[]) ?? [],
// };

// const assignmentsSlice = createSlice({
//   name: "assignments",
//   initialState,
//   reducers: {
//     addAssignment: (
//       state,
//       { payload }: PayloadAction<Omit<Assignment, "_id"> & Partial<Assignment>>
//     ) => {
//       const newAssignment: Assignment = {
//         _id: uuidv4(),
//         course: payload.course!,
//         name: payload.name ?? "New Assignment",
//         description: payload.description ?? "",
//         points: payload.points ?? 100,
//         dueDate: payload.dueDate ?? new Date().toISOString().slice(0, 10),
//         availableFrom: payload.availableFrom ?? new Date().toISOString().slice(0, 10),
//         availableUntil: payload.availableUntil ?? new Date().toISOString().slice(0, 10),
//       };
//       state.assignments = [...state.assignments, newAssignment];
//     },
//     updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
//       state.assignments = state.assignments.map((a) =>
//         a._id === payload._id ? payload : a
//       );
//     },
//     deleteAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
//       state.assignments = state.assignments.filter((a) => a._id !== assignmentId);
//     },
//   },
// });

// export const { addAssignment, updateAssignment, deleteAssignment } =
//   assignmentsSlice.actions;
// export default assignmentsSlice.reducer;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: courses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload: course }) => {
      const newCourse = { ...course, _id: uuidv4() };
      state.courses = [...state.courses, newCourse] as any;
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (course: any) => course._id !== courseId
      );
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      ) as any;
    },
  },
});

// ✅ Named exports for the action creators (this is what Dashboard imports)
export const { addNewCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;

// ✅ Default export for the reducer (this is what the store imports)
export default coursesSlice.reducer;
