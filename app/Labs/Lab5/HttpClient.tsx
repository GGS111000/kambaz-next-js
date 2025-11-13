"use client";

import React, { useEffect, useState } from "react";
import * as client from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");

  const fetchWelcomeOnClick = async () => {
    const msg = await client.fetchWelcomeMessage();
    setWelcomeOnClick(msg);
  };

  const fetchWelcomeOnLoad = async () => {
    const msg = await client.fetchWelcomeMessage();
    setWelcomeOnLoad(msg);
  };

  useEffect(() => {
    fetchWelcomeOnLoad();
  }, []);

  return (
    <div>
      <h3>HTTP Client</h3>
      <hr />

      <h4>Requesting on Click</h4>
      <button onClick={fetchWelcomeOnClick} className="btn btn-primary">
        Fetch Welcome
      </button>
      <br />
      Response: <b>{welcomeOnClick}</b>
      <hr />

      <h4>Requesting on Load</h4>
      Response: <b>{welcomeOnLoad}</b>
      <hr />
    </div>
  );
}
