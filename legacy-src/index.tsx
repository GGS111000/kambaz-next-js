import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Labs from "./Labs";   // TOC
// import Lab1 from "./Labs/Lab1";
// import Lab2 from "./Labs/Lab2";
// import Lab3 from "./Labs/Lab3";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/Labs" element={<Labs />} />
      <Route path="/Labs/Lab1" element={<Lab1 />} />
      <Route path="/Labs/Lab2" element={<Lab2 />} />
      <Route path="/Labs/Lab3" element={<Lab3 />} />
    </Routes>
  </BrowserRouter>
);
