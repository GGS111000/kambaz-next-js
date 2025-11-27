/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as client from "../../../Courses/client";

export default function PeoplePage() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;

  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!courseId) return;
    const list = await client.findUsersForCourse(courseId);
    setUsers(list);
  };

  useEffect(() => {
    fetchUsers();
  }, [courseId]);

  return (
    <div>
      <h3>People in Course {courseId}</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
