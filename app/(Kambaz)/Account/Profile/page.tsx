/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import { Form } from "react-bootstrap";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [profile, setProfile] = useState<any>({});

  // Load profile
  useEffect(() => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  }, [currentUser]);

  // Update profile to server
  const updateProfile = async () => {
    try {
      const updated = await client.updateUser(profile);
      dispatch(setCurrentUser(updated));
      alert("Profile updated!");
    } catch (e) {
      alert("Update failed.");
    }
  };

  // Sign out
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  return (
    <div id="wd-profile-screen" className="container mt-5" style={{ maxWidth: "500px" }}>
      <h1 className="mb-4 text-center">Profile</h1>

      {profile && (
        <Form>

          {/* Username */}
          <Form.Group className="mb-3" controlId="wd-username">
            <Form.Control
              type="text"
              defaultValue={profile.username}
              placeholder="Username"
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="wd-password">
            <Form.Control
              type="password"
              defaultValue={profile.password}
              placeholder="Password"
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
          </Form.Group>

          {/* First Name */}
          <Form.Group className="mb-3" controlId="wd-firstname">
            <Form.Control
              type="text"
              defaultValue={profile.firstName}
              placeholder="First Name"
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
          </Form.Group>

          {/* Last Name */}
          <Form.Group className="mb-3" controlId="wd-lastname">
            <Form.Control
              type="text"
              defaultValue={profile.lastName}
              placeholder="Last Name"
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </Form.Group>

          {/* DOB */}
          <Form.Group className="mb-3" controlId="wd-dob">
            <Form.Control
              type="date"
              defaultValue={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="wd-email">
            <Form.Control
              type="email"
              defaultValue={profile.email}
              placeholder="Email"
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </Form.Group>

          {/* Role */}
          <Form.Group className="mb-3" controlId="wd-role">
            <Form.Select
              defaultValue={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex flex-column gap-2 mt-4">

            <button
              onClick={updateProfile}
              type="button"
              className="btn btn-primary w-100"
            >
              Update
            </button>

            <button
              onClick={signout}
              type="button"
              className="btn btn-danger w-100"
              id="wd-signout-btn"
            >
              Sign out
            </button>

          </div>

        </Form>
      )}
    </div>
  );
}
