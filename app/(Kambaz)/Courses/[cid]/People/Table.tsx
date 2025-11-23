/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import PeopleDetails from "./Details";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable({
  users = [],
  fetchUsers,
}: {
  users?: any[];
  fetchUsers: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);

  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers();
          }}
        />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td
                className="wd-full-name text-nowrap"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowUserId(user._id);
                  setShowDetails(true);
                }}
              >
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                {user.firstName} {user.lastName}
              </td>

              <td>{user.loginId}</td>
              <td>{user.section}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
