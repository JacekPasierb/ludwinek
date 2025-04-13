import styles from "../styles/admin.module.css";

const Page = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>⚙️ Panel admina</h2>
      <nav className={styles.nav}>
        <a href="/admin/posts">📄 Posty</a>
        <a href="/admin/zawody">🎣 Zawody</a>
        <a href="/admin/chatbot">🤖 Chatbot</a>
        <a href="/">← Wróć na stronę</a>
      </nav>
    </div>
  );
};

export default Page;
