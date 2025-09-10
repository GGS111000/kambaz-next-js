import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" alt="react-logo" width={200} height={150} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course1.jpg" alt="photo-course-1" width={200} height={150} />
            <div>
              <h5> CS5700 Fundamentals </h5>
              <p className="wd-dashboard-course-title">
                Computer Network{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course2.jpg" alt="photo-course-2" width={200} height={150} />
            <div>
              <h5> AI in Action </h5>
              <p className="wd-dashboard-course-title">
                Building Your Essential AI Tool Kit{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course3.jpg" alt="photo-course-3" width={200} height={150} />
            <div>
              <h5> Career Design Course </h5>
              <p className="wd-dashboard-course-title">
                Career.design{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course4.jpg" alt="photo-course-4" width={200} height={150} />
            <div>
              <h5> CS5002 Discrete Structures </h5>
              <p className="wd-dashboard-course-title">
              Discrete Structures{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course5.jpg" alt="photo-course-5" width={200} height={150} />
            <div>
              <h5> CS5004 OOD </h5>
              <p className="wd-dashboard-course-title">
                Object Oriented Design{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course6.jpg" alt="photo-course-6" width={200} height={150} />
            <div>
              <h5> CS5008 Data Str </h5>
              <p className="wd-dashboard-course-title">
                Data str, Algo & App in computer system{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course7.jpg" alt="photo-course-7" width={200} height={150} />
            <div>
              <h5> CS5800 Algorithms Summer </h5>
              <p className="wd-dashboard-course-title">
              Algorithms Summer{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course8.jpg" alt="photo-course-8" width={200} height={150} />
            <div>
              <h5> CS5009 Recitation </h5>
              <p className="wd-dashboard-course-title">
                Recitation for CS5008{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>


        <div className="wd-dashboard-course"> ... </div>
        <div className="wd-dashboard-course"> ... </div>
      </div>
    </div>
);}
