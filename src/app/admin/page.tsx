import styles from "../styles/pageAdmin.module.css";
import EditInfo from "./ui/editInfo";
import EditRecord from "./ui/editRecord";
import ChangePassword from "./ui/changePassword";

const Page = () => {
  return (
    <div className={styles.panel}>
      <div className={styles.block}>
        <EditInfo />
      </div>

      <div className={styles.block}>
        <EditRecord />
      </div>

      <div className={styles.block}>
        <ChangePassword />
      </div>
    </div>
  );
};

export default Page;
