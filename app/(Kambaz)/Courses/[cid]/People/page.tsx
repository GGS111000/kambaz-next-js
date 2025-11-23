/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as client from "../../../Account/client";

export default function PeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const all = await client.findAllUsers();
    setUsers(all);
  };

  return (
    <div>
      <h3>People in Course {cid}</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
