import styles from "./stat_card.module.css";

function StatCard({ name, value }: { name: string; value?: number }) {
  const stat = value ?? "N/A";

  return (
    <div className={styles.stats}>
      <p className={styles.name}>{name}:</p>
      <p className={styles.stat}>{stat}</p>
    </div>
  );
}

export { StatCard };
