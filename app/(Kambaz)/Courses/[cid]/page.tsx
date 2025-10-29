<<<<<<< HEAD

=======
>>>>>>> 51f728575e7d8f5e6f459acc3b61e1198c7c1616
import { redirect } from "next/navigation";


export default async function CoursesPage({ params, }: { params: Promise<{ cid: string }>; }) {
 const { cid } = await params;
 redirect(`/Courses/${cid}/Home`);
}
<<<<<<< HEAD
=======

>>>>>>> 51f728575e7d8f5e6f459acc3b61e1198c7c1616
