/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENTS_API_ROOT = `${HTTP_SERVER}/api`;

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(
    `${ASSIGNMENTS_API_ROOT}/courses/${courseId}/assignments`
  );
  return data;
};

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

export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axios.delete(
    `${ASSIGNMENTS_API_ROOT}/assignments/${assignmentId}`
  );
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(
    `${ASSIGNMENTS_API_ROOT}/assignments/${assignment._id}`,
    assignment
  );
  return data;
};
