

"use client";

import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
import HttpClient from "./HttpClient";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
console.log("HTTP_SERVER =", HTTP_SERVER);

export default function Lab5() {
  return (
    <div id="wd-lab5" className="container mt-3">

      <h2>Lab 5</h2>

      {/* Welcome link */}
      <div className="list-group mb-3">
        <a
          href={`${HTTP_SERVER}/lab5/welcome`}
          className="list-group-item"
          id="wd-lab5-welcome"
        >
          Welcome
        </a>
      </div>

      {/* 5.2.1 Environment Variables */}
      <EnvironmentVariables />

      {/* 5.2.2 Sending Data via Path Parameters */}
      <PathParameters />

      {/* 5.2.2.2 Sending Data via Query Parameters */}
      <QueryParameters />

      {/* 5.2.3 Working With Objects */}
      <WorkingWithObjects />

      {/* 5.2.5 HttpClient (Async GET example) */}
      <HttpClient />

      {/* 5.2.5.5 Working with Objects Asynchronously */}
      <WorkingWithObjectsAsynchronously />

      {/* 5.2.4 Working with Arrays */}
      <WorkingWithArrays />

      {/* 5.2.5.6 Working with Arrays Asynchronously */}
      <WorkingWithArraysAsynchronously />

    </div>
  );
}
