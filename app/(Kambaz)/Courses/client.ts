/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// Axios instance with cookies (session support)
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

// Retrieve all courses (not used by dashboard, but useful for Courses screen)
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

// Retrieve courses for current logged-in user
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

// Create new course (for current user)
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

// Delete course by ID
export const deleteCourse = async (courseId: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${courseId}`);
  return data;
};

// Update course
export const updateCourse = async (course: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};
