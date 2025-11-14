import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. 声明课程类型
export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate?: string;
  endDate?: string;
  department?: string;
  credits?: number;
  description?: string;
}

// 2. 声明 state 类型
interface CoursesState {
  courses: Course[];
}

// 3. 初始化 state（必须写类型，不然就会变 never[]）
const initialState: CoursesState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },

    addNewCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },

    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(
        (c) => c._id !== action.payload
      );
    },

    updateCourse: (state, action: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
    },
  },
});

// 4. export actions & reducer
export const {
  setCourses,
  addNewCourse,
  deleteCourse,
  updateCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;
