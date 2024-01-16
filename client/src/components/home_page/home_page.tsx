import { useContext } from "react";
import styles from "./home_page.module.css";
import { MisdemeanoursContext } from "../../hooks/misdemeanour_context/misdemeanour_context";
import { StatCard } from "./stat_card";

function HomePage() {
  const { totalMisdemeanours } = useContext(MisdemeanoursContext);

  return (
    <>
      <main className={styles.page}>
        <p>Welcome to the home of the Justice Department of Fakelandia.</p>

        <p>
          Here you can browse a list of recent misdemeanours committed by our
          citizens, or you can confess to your own misdemeanour.
        </p>

        <StatCard name="Total Misdemeanours" value={totalMisdemeanours} />
      </main>
    </>
  );
}

export { HomePage };
