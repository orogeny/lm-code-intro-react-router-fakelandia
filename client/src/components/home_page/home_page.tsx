import { useContext } from "react";
import styles from "./home_page.module.css";
import { MisdemeanoursContext } from "../../hooks/misdemeanour_context/misdemeanour_context";

function HomePage() {
  return (
    <>
      <main className={styles.page}>
        <p>Welcome to the home of the Justice Department of Fakelandia.</p>

        <p>
          Here you can browse a list of recent misdemeanours committed by our
          citizens, or you can confess to your own misdemeanour.
        </p>

        <TotalMisdemeanours />
      </main>
    </>
  );
}

function TotalMisdemeanours() {
  const context = useContext(MisdemeanoursContext);

  if (context.isLoading) {
    return null;
  }

  return (
    <div className={styles.stats}>
      <p className={styles.name}>Total Misdemeanours:</p>
      <p className={styles.stat}>{context.totalMisdemeanours}</p>
    </div>
  );
}

export { HomePage };
