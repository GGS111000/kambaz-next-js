/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { FormControl } from "react-bootstrap";

import * as client from "../client";
import { RootState } from "../../store";
import { setCurrentUser } from "../reducer";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [profile, setProfile] = useState<any>(currentUser);

  useEffect(() => {
    setProfile(currentUser);
  }, [currentUser]);

  if (!currentUser) {
    redirect("/Account/Signin");
  }

  const updateProfile = async () => {
    const updated = await client.updateUser(profile);
    dispatch(setCurrentUser(updated));
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  return (
    <div className="container mt-3">
      <h3>Profile</h3>

      {profile && (
        <div>
          <FormControl
            className="mb-2"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />

          <FormControl
            className="mb-2"
            type="password"
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />

          <button className="btn btn-primary w-100 mb-2" onClick={updateProfile}>
            Update
          </button>

          <button className="btn btn-danger w-100" onClick={signout}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
