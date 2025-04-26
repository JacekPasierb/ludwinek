import {getServerSession} from "next-auth";

import {redirect} from "next/navigation";
import LoginForm from "../components/LoginForm";
import Link from "next/link";

import styles from "../styles/admin.module.css";
import AdminDashboard from "./AdminDashboard";
import { authOptions } from "../../lib/auth";

interface AdminDashboardProps {
  children: React.ReactNode;
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginForm />;
  }

  if (session.user?.name !== "admin") {
    redirect("/");
  }

  return <AdminDashboard>{children}</AdminDashboard>;
}
