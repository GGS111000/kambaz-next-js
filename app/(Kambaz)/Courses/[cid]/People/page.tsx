/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as client from "../../client";

export default function PeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const list = await client.findUsersForCourse(cid as string);
    setUsers(list);
  };

  useEffect(() => {
  const load = async () => {
    if (cid) {
      const list = await client.findUsersForCourse(cid as string);
      setUsers(list);
    }
  };
  load();
}, [cid]);


  return (
    <div>
      <h3>People in Course {cid}</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
