// "use client";
// import Link from "next/link";
// import { Form, Button } from "react-bootstrap";

// export default function Profile() {
//   return (
//     <div id="wd-profile-screen" className="container mt-5" style={{ maxWidth: "500px" }}>
//       <h1 className="mb-4 text-center">Profile</h1>

//       <Form>
//         <Form.Group className="mb-3" controlId="wd-username">
//           <Form.Control type="text" defaultValue="alice" placeholder="Username" />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="wd-password">
//           <Form.Control type="password" defaultValue="123" placeholder="Password" />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="wd-firstname">
//           <Form.Control type="text" defaultValue="Alice" placeholder="First Name" />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="wd-lastname">
//           <Form.Control type="text" defaultValue="Wonderland" placeholder="Last Name" />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="wd-dob">
//           <Form.Control type="date" defaultValue="2000-01-01" />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="wd-email">
//           <Form.Control type="email" defaultValue="alice@wonderland" placeholder="Email" />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="wd-role">
//           <Form.Select defaultValue="FACULTY">
//             <option value="USER">User</option>
//             <option value="ADMIN">Admin</option>
//             <option value="FACULTY">Faculty</option>
//             <option value="STUDENT">Student</option>
//           </Form.Select>
//         </Form.Group>

//         <div className="d-flex justify-content-between mt-4">
         
//           <Link href="/Account/Signin" className="btn btn-danger">
//             Sign out
//           </Link>
//         </div>
//       </Form>
//     </div>
//   );
// }
"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl } from "react-bootstrap";
export default function Profile() {
 const [profile, setProfile] = useState<any>({});
 const dispatch = useDispatch();
 const { currentUser } = useSelector((state: any) => state.accountReducer);
 const fetchProfile = () => {
   if (!currentUser) return redirect("/Account/Signin");
   setProfile(currentUser);
 };
 const signout = () => {
   dispatch(setCurrentUser(null));
   redirect("/Account/Signin");
 };
 useEffect(() => {
   fetchProfile();
 }, []);
 return (
   <div className="wd-profile-screen">
     <h3>Profile</h3>
     {profile && (
       <div>
         <FormControl id="wd-username" className="mb-2"
           defaultValue={profile.username}
           onChange={(e) => setProfile({ ...profile, username: e.target.value }) }
         />
         <FormControl id="wd-password" className="mb-2"
           defaultValue={profile.password}
           onChange={(e) => setProfile({ ...profile, password: e.target.value }) }
         />
         <FormControl id="wd-firstname" className="mb-2"
           defaultValue={profile.firstName}
           onChange={(e) => setProfile({ ...profile, firstName: e.target.value }) }
         />
         <FormControl id="wd-lastname" className="mb-2"
           defaultValue={profile.lastName}
           onChange={(e) => setProfile({ ...profile, lastName: e.target.value }) } />
         <FormControl id="wd-dob" className="mb-2" type="date"
           defaultValue={profile.dob}
           onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
         <FormControl id="wd-email" className="mb-2"
           defaultValue={profile.email}
           onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
         <select className="form-control mb-2" id="wd-role" 
           onChange={(e) => setProfile({ ...profile, role: e.target.value })} >
           <option value="USER">User</option>
           <option value="ADMIN">Admin</option>
           <option value="FACULTY">Faculty</option>{" "}
           <option value="STUDENT">Student</option>
         </select>
         <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
           Sign out
         </Button>
       </div>
     )}
   </div>
);}

