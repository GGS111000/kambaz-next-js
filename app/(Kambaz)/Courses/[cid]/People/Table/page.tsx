"use client";

import React from "react";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import { FaUserCircle } from "react-icons/fa";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const { users, enrollments } = db as {
    users: User[];
    enrollments: Enrollment[];
  };

  const enrolledUsers = users.filter((usr: User) =>
    enrollments.some(
      (enr: Enrollment) => enr.user === usr._id && enr.course === cid
    )
  );

  return (
    <div className="container mt-4">
      <h3 className="fw-bold text-danger mb-3">People in {cid}</h3>
      <hr />
      <table className="table table-striped align-middle">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {enrolledUsers.map((user: User) => (
            <tr key={user._id}>
              <td>
                <FaUserCircle className="me-2 fs-3 text-secondary" />
                {user.firstName} {user.lastName}
              </td>
              <td>{user.loginId}</td>
              <td>{user.section}</td>
              <td>{user.role}</td>
              <td>{user.lastActivity}</td>
              <td>{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {enrolledUsers.length === 0 && (
        <div className="text-muted">No people enrolled in this course.</div>
      )}
    </div>
  );
}
