import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import enrollmentReducer from "./Enrollments/EnrollmentReducer";




const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
     accountReducer,
     enrollmentReducer, 
  },
});
export default store;