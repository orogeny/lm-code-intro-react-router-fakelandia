import styles from "./confession_page.module.css";

function ConfessionPage() {
  return (
    <>
      <main className={styles.page}>
        <p>
          It's very difficult to catch people committing misdemeanours so we
          appreciatae it when citizens confess to us directly.
        </p>

        <p>
          However, if you're just having a hard day and need to vent then you're
          welcome to contact us here too. Up to you!
        </p>
      </main>
    </>
  );
}

export { ConfessionPage };