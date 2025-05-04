import styles from "../styles/pageAdmin.module.css";

import EditTitle from "./ui/editTitle";
import EditSubtitle from "./ui/editSubtitle";
import EditRecord from "./ui/editRecord";

const Page = () => {
  return (
    <div className={styles.panel}>
      <div className={styles.block}>
        <EditTitle />
      </div>
      <div className={styles.line}></div>

      <div className={styles.block}>
        <EditSubtitle />
      </div>
      <div className={styles.line}></div>
      <div className={styles.block}>
        <EditRecord/>
      </div>
    </div>
  );
};

export default Page;
