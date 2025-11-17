/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { ListGroup, Button } from "react-bootstrap";

import * as client from "./client";
import { RootState } from "../../../store";

import {
  setAssignments,
  deleteAssignment,
} from "./reducer";

export default function AssignmentsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const cid = params?.cid as string;

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const fetchAssignments = async () => {
    const data = await client.findAssignmentsForCourse(cid);
    dispatch(setAssignments(data));
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const onDelete = async (id: string) => {
    await client.deleteAssignment(id);
    dispatch(deleteAssignment(id));
  };

  return (
    <div className="container mt-3">
      <h3>Assignments</h3>

      <Button
        className="mb-3"
        onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
      >
        Add Assignment
      </Button>

      <ListGroup>
        {assignments.map((a: any) => (
          <ListGroup.Item key={a._id}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="fw-bold">{a.title}</div>

              <div>
                <Button
                  className="me-2"
                  size="sm"
                  onClick={() =>
                    router.push(`/Courses/${cid}/Assignments/${a._id}`)
                  }
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(a._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
