import {
  MISDEMEANOUR_OPTIONS,
  Misdemeanour,
  MisdemeanourKind,
  MisdemeanourOption,
} from "../../misdemeanours.types";
import styles from "./misdemeanour_list.module.css";

function MisdemeanourList({ items = [] }: { items: Misdemeanour[] }) {
  return (
    <ul className={styles.list}>
      <RowHeader />

      {items.map((m) => (
        <RowItem key={m.id} misdemeanour={m} />
      ))}
    </ul>
  );
}

function RowHeader() {
  return (
    <li className={styles.row}>
      <p>Citizen ID</p>
      <p>Date</p>
      <p>Misdemeanour</p>
      <p>Punishment Idea</p>
    </li>
  );
}

function RowItem({
  misdemeanour: { citizenId, date, type },
}: {
  misdemeanour: Misdemeanour;
}) {
  return (
    <li className={styles.row}>
      <p>{citizenId}</p>
      <p>{date.toLocaleDateString("en-GB")}</p>
      <Option kind={type} />
      <img className={styles.idea} src="https://picsum.photos/160/90" />
    </li>
  );
}

function Option({ kind }: { kind: MisdemeanourKind }) {
  const { label, emoji } = MISDEMEANOUR_OPTIONS.find(
    (o) => o.type === kind
  ) as MisdemeanourOption;

  return (
    <div className={styles.option}>
      <p>{label}</p>
      <p>{emoji}</p>
    </div>
  );
}

export { MisdemeanourList };
