import { useSuspenseQuery } from "@tanstack/react-query";
import styles from "./misdemeanours_page.module.css";
import { fetchMisdemeanours } from "./fetch_misdemeanours";
import { MisdemeanourTable } from "./misdemeanour_table";

function MisdemeanoursPage() {
  const { data } = useSuspenseQuery({
    queryKey: ["misdemeanourse", "all"],
    queryFn: () => fetchMisdemeanours(20),
    gcTime: Infinity,
    staleTime: Infinity,
  });

  return (
    <main className={styles.page}>
      <MisdemeanourTable items={data} />
    </main>
  );
}

export { MisdemeanoursPage };
