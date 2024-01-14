import styles from "./misdemeanours_page.module.css";
import { fetchMisdemeanours } from "./fetch_misdemeanours";
import { MisdemeanourTable } from "./misdemeanour_table";

function MisdemeanoursPage() {
  return (
    <main className={styles.page}>
      <MisdemeanourTable items={[]} />
    </main>
  );
}

export { MisdemeanoursPage };
