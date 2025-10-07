// import { Table } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";
// export default function PeopleTable() {
//  return (
//   <div id="wd-people-table">
//    <Table striped>
//     <thead>
//      <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
//     </thead>
//     <tbody>
//      <tr><td className="wd-full-name text-nowrap">
//           <FaUserCircle className="me-2 fs-1 text-secondary" />
//           <span className="wd-first-name">Tony</span>{" "}
//           <span className="wd-last-name">Stark</span></td>
//       <td className="wd-login-id">001234561S</td>
//       <td className="wd-section">S101</td>
//       <td className="wd-role">STUDENT</td>
//       <td className="wd-last-activity">2020-10-01</td>
//       <td className="wd-total-activity">10:21:32</td></tr>
//           {/* Add at least 3 more users such as Bruce Wayne, Steve Rogers, and Natasha Romanoff */}
//         <tr><td className="wd-full-name text-nowrap">
//           <FaUserCircle className="me-2 fs-1 text-secondary" />
//           <span className="wd-first-name">Steve </span>{" "}
//           <span className="wd-last-name"> Rogers </span></td>
//       <td className="wd-login-id">001234562S</td>
//       <td className="wd-section">S101</td>
//       <td className="wd-role">STUDENT</td>
//       <td className="wd-last-activity">2020-10-01</td>
//       <td className="wd-total-activity">10:21:32</td></tr>

//       <tr><td className="wd-full-name text-nowrap">
//           <FaUserCircle className="me-2 fs-1 text-secondary" />
//           <span className="wd-first-name">Natasha </span>{" "}
//           <span className="wd-last-name"> Romanof</span></td>
//       <td className="wd-login-id">001234563S</td>
//       <td className="wd-section">S101</td>
//       <td className="wd-role">STUDENT</td>
//       <td className="wd-last-activity">2020-10-01</td>
//       <td className="wd-total-activity">10:21:32</td></tr>

//       <tr><td className="wd-full-name text-nowrap">
//           <FaUserCircle className="me-2 fs-1 text-secondary" />
//           <span className="wd-first-name">Bruce </span>{" "}
//           <span className="wd-last-name"> Wayne</span></td>
//       <td className="wd-login-id">001234564S</td>
//       <td className="wd-section">S101</td>
//       <td className="wd-role">STUDENT</td>
//       <td className="wd-last-activity">2020-10-01</td>
//       <td className="wd-total-activity">10:21:32</td></tr>
    
    
//     </tbody>
//    </Table>
//   </div> );}

"use client";

import React from "react";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const { users, enrollments } = db;

  // ✅ 筛选当前课程注册的用户
  const enrolledUsers = users.filter((usr: any) =>
    enrollments.some(
      (enr: any) => enr.user === usr._id && enr.course === cid
    )
  );

  return (
    <div className="container mt-4">
      <h3 className="fw-bold text-danger mb-3">People</h3>
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
          {enrolledUsers.map((user: any) => (
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
