import { useQuery } from "@tanstack/react-query";
import styles from "./misdemeanours_page.module.css";
import { fetchMisdemeanours } from "./fetch_misdemeanours";
import { MisdemeanourList } from "./misdemeanour_list";

function MisdemeanoursPage() {
  const { isSuccess, data } = useQuery({
    queryKey: ["misdemeanourse", "all"],
    queryFn: () => fetchMisdemeanours(20),
  });

  if (!isSuccess) return null;

  return (
    <main className={styles.page}>
      <MisdemeanourList items={data} />
    </main>
  );
}

export { MisdemeanoursPage };
