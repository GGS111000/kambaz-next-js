// This file re-exports the canonical Enrollments slice to avoid duplicate reducers
export { default } from "../Enrollments/EnrollmentReducer";
export { enroll, unenroll, toggleEnrollment } from "../Enrollments/EnrollmentReducer";
