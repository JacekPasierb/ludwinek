import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import AdminDashboard from "./AdminDashboard";


export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginForm />; 
  }



 if (session.user?.name !== "admin") {
    redirect("/"); // Tylko admin ma dostęp
  }

  return <AdminDashboard />;
}










// import styles from "../styles/admin.module.css";

// const Page = () => {
//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>⚙️ Panel admina</h2>
//       <nav className={styles.nav}>
//         <a href="/admin/posts">📄 Posty</a>
//         <a href="/admin/zawody">🎣 Zawody</a>
//         <a href="/admin/chatbot">🤖 Chatbot</a>
//         <a href="/">← Wróć na stronę</a>
//       </nav>
//     </div>
//   );
// };

// export default Page;
