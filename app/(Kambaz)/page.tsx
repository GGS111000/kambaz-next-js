import { redirect } from "next/navigation";
export default function Kambaz() {
  redirect("/Account/Signin");
}
// import { Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./Dashboard/page";
// import KambazNavigation from "./Navigation";
// import Account from "./Account/page";
// import Courses from "./Courses/[cid]/page";


// <div id="wd-kambaz">

//       <KambazNavigation />
     
//     <div>
//       <Routes>
//         <Route path="/" element={<Navigate to="Account" />} />
//         <Route path="/Account/*" element={<Account />} />
//         <Route path="/Dashboard" element={<Dashboard />} />
//         <Route path="/Courses/:cid/*" element={<Courses />} />
//       </Routes>
//     </div>
      
// </div>
