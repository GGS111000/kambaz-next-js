"use client";

import Link from "next/link";
import Image from "next/image";

export default function KambazNavigation() {
  return (
    <nav className="p-3 bg-black text-white" style={{ minHeight: "100vh", width: 260 }}>
      <div className="d-flex align-items-center mb-3">
        {/* 用 next/image 并添加 alt */}
        <Image
          src="/images/logo.png"
          alt="Kambaz Logo"
          width={36}
          height={36}
          className="me-2 rounded"
          priority
        />
        <span className="fw-bold">Kambaz</span>
      </div>

      <ul className="list-unstyled">
        <li className="mb-2">
          <Link href="/Dashboard" className="text-decoration-none text-white">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/Courses" className="text-decoration-none text-white">
            Courses
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/Diagnostics/StoreDebug" className="text-decoration-none text-white">
            Store Debug
          </Link>
        </li>
      </ul>
    </nav>
  );
}
