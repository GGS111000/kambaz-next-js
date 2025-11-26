/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const axiosWithCredentials = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HTTP_SERVER,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;
const ASSIGNMENTS_API_ROOT = `${HTTP_SERVER}/api`;

// 课程 —— 所有课程（一般不用，你主要用 findMyCourses）
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

/** 获取所有课程（Dashboard 用） */
export const findAllCourses = async () => {
  const response = await axiosWithCredentials.get(COURSES_API);
  return response.data;
};

// 课程 —— 当前用户的课程列表
export const findMyCourses = async () => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return response.data;
};

// 课程 —— 创建课程，并自动把当前用户 enroll 进去
export const createCourse = async (course: any) => {
  const response = await axiosWithCredentials.post(COURSES_API, course);
  return response.data;
};

// 课程 —— 删除
export const deleteCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}`
  );
  return response.data;
};

// 课程 —— 更新
export const updateCourse = async (course: any) => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return response.data;
};
/** ENROLL：注册课程 */
export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

/** UNENROLL：取消注册课程 */
export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};
/* ---------- Modules ---------- */

// 某门课程的所有模块
export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axios.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return data;
};

// 为课程创建模块
export const createModuleForCourse = async (
  courseId: string,
  module: any
) => {
  const { data } = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return data;
};

// 删除模块
export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return response.data;
};

// 更新模块
export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`
    , module
  );
  return data;
};

/* ---------- Enrollments ---------- */

export const enrollInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/enroll`,
    {}
  );
  return data;
};


export const myEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(
    `${ENROLLMENTS_API}/current`
  );
  return data;
};

/* ---------- Assignments ---------- */

// 某课程的所有作业
export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(
    `${ASSIGNMENTS_API_ROOT}/courses/${courseId}/assignments`
  );
  return data;
};

// 为课程创建作业
export const createAssignmentForCourse = async (
  courseId: string,
  assignment: any
) => {
  const { data } = await axios.post(
    `${ASSIGNMENTS_API_ROOT}/courses/${courseId}/assignments`,
    assignment
  );
  return data;
};

// 删除作业
export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axios.delete(
    `${ASSIGNMENTS_API_ROOT}/assignments/${assignmentId}`
  );
  return data;
};

// 更新作业
export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(
    `${ASSIGNMENTS_API_ROOT}/assignments/${assignment._id}`,
    assignment
  );
  return data;
};
