import styles from "./home_page.module.css";

function HomePage() {
  return (
    <>
      <main className={styles.page}>
        <p>Welcome to the home of the Justice Department of Fakelandia.</p>

        <p>
          Here you can browse a list of recent misdemeanours committed by our
          citizens, or you can confess to your own misdemeanour.
        </p>
      </main>
    </>
  );
}

export { HomePage };
