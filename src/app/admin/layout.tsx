import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/lib/auth";
import {LoginForm} from "../components/LoginForm";
import AdminDashboard from "./AdminDashboard";

type AdminLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const ADMIN_USERNAME = "admin";

export default async function AdminLayout({children}: AdminLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginForm />;
  }

  if (session.user?.name !== ADMIN_USERNAME) {
    redirect("/");
  }

  return <AdminDashboard>{children}</AdminDashboard>;
}
