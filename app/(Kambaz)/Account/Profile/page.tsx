/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { FormControl, Form } from "react-bootstrap";
import * as client from "../client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});

  const fetchProfile = async () => {
    try {
      const user = await client.profile();
      setProfile(user);
    } catch (e) {
      console.log("Not logged in");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    await client.updateUser(profile);
    alert("Profile updated!");
  };

  const signout = async () => {
    await client.signout();
    window.location.href = "/Account/Signin";
  };

  return (
    <div className="container mt-3">
      <h1>Profile</h1>

      {/* Username */}
      <Form.Label>Username</Form.Label>
      <FormControl
        className="mb-2"
        value={profile.username || ""}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      />

      {/* Password */}
      <Form.Label>Password</Form.Label>
      <FormControl
        className="mb-2"
        type="password"
        value={profile.password || ""}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
      />

      {/* First Name */}
      <Form.Label>First Name</Form.Label>
      <FormControl
        className="mb-2"
        value={profile.firstName || ""}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
      />

      {/* Last Name */}
      <Form.Label>Last Name</Form.Label>
      <FormControl
        className="mb-2"
        value={profile.lastName || ""}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
      />

      {/* Email */}
      <Form.Label>Email</Form.Label>
      <FormControl
        className="mb-2"
        value={profile.email || ""}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />

      {/* Date of Birth */}
      <Form.Label>Date of Birth</Form.Label>
      <FormControl
        className="mb-2"
        type="date"
        value={profile.dob ? profile.dob.substring(0, 10) : ""}
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
      />

      {/* Login ID */}
      <Form.Label>Login ID</Form.Label>
      <FormControl
        className="mb-2"
        value={profile.loginId || ""}
        onChange={(e) => setProfile({ ...profile, loginId: e.target.value })}
      />

      {/* Section */}
      <Form.Label>Section</Form.Label>
      <FormControl
        className="mb-2"
        value={profile.section || ""}
        onChange={(e) => setProfile({ ...profile, section: e.target.value })}
      />

      {/* Role (read-only) */}
      <Form.Label>Role</Form.Label>
      <FormControl
        className="mb-2"
        value={profile.role || ""}
        disabled
      />

      {/* Last Activity */}
      <Form.Label>Last Activity</Form.Label>
      <FormControl
        className="mb-2"
        value={profile.lastActivity ? profile.lastActivity.substring(0, 10) : ""}
        disabled
      />

      {/* Total Activity */}
      <Form.Label>Total Activity</Form.Label>
      <FormControl
        className="mb-3"
        value={profile.totalActivity || ""}
        disabled
      />

      {/* Buttons */}
      <button className="btn btn-primary w-100 mb-2" onClick={updateProfile}>
        Update
      </button>

      <button className="btn btn-danger w-100" onClick={signout}>
        Sign out
      </button>
    </div>
  );
}
