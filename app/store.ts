import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./(Kambaz)/Courses/reducer";
import modulesReducer from "./(Kambaz)/Courses/[cid]/Modules/reducer";
import assignmentsReducer from "./(Kambaz)/Courses/[cid]/Assignments/reducer";

const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    assignmentsReducer,
  },
});

export default store;
