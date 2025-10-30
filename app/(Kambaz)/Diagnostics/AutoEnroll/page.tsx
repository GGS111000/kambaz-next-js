"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { users } from "../../Database";
import { setCurrentUser } from "../../Account/reducer";
import { enroll } from "../../Enrollments/EnrollmentReducer";

export default function AutoEnrollPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // pick a test student if available
    const student = users.find((u: any) => u.role === "STUDENT") ?? users[0];
    if (!student) return;
    console.debug("AutoEnroll: setting current user", student);
    dispatch(setCurrentUser(student));

    // enroll in a couple of sample courses
    const sampleCourses = ["RS101", "RS102"];
    for (const cid of sampleCourses) {
      console.debug("AutoEnroll: enrolling", { userId: student._id, courseId: cid });
      dispatch(enroll({ userId: student._id, courseId: cid }));
    }

    // navigate back to dashboard where My Enrollments will show
    setTimeout(() => {
      router.push("/Dashboard");
    }, 300);
  }, [dispatch, router]);

  return (
    <div className="container mt-4">
      <h3>AutoEnroll</h3>
      <p>If this page is opened in the browser it will sign in a test student and enroll them in sample courses, then redirect to the Dashboard.</p>
      <p>Open <b>/Kambaz/Diagnostics/StoreDebug</b> to inspect the store after running.</p>
    </div>
  );
}
