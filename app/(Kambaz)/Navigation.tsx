"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaUserCircle,
  FaTachometerAlt,
  FaBook,
  FaFlask, // 🔬 实验图标
} from "react-icons/fa";

export default function KambazNavigation() {
  const pathname = usePathname();
  const active = (path: string) =>
    pathname.startsWith(path) ? "text-danger" : "text-white";

  return (
    <div
      className="d-flex flex-column align-items-center bg-black text-white p-3"
      style={{ width: 110, minHeight: "100vh" }}
    >
      {/* 顶部 Kambaz 图标 */}
      <Link href="/Dashboard" className="text-decoration-none mb-4">
        <FaBook className="fs-1 text-danger" />
      </Link>

      {/* 主导航菜单 */}
      <div className="nav flex-column text-center gap-4">
        <Link href="/Account" className={`nav-link ${active("/Account")}`}>
          <FaUserCircle className="fs-3" />
          <div>Account</div>
        </Link>

        <Link href="/Dashboard" className={`nav-link ${active("/Dashboard")}`}>
          <FaTachometerAlt className="fs-3" />
          <div>Dashboard</div>
        </Link>

        <Link href="/Courses" className={`nav-link ${active("/Courses")}`}>
          <FaBook className="fs-3" />
          <div>Courses</div>
        </Link>

        {/* ✅ 新增 Labs 链接 */}
        <Link href="/Labs" className={`nav-link ${active("/Labs")}`}>
          <FaFlask className="fs-3" />
          <div>Labs</div>
        </Link>
      </div>
    </div>
  );
}
