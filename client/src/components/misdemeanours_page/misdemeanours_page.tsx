import styles from "./misdemeanours_page.module.css";
import { MisdemeanourTable } from "./misdemeanour_table";

function MisdemeanoursPage() {
  return (
    <main className={styles.page}>
      <MisdemeanourTable />
    </main>
  );
}

export { MisdemeanoursPage };
