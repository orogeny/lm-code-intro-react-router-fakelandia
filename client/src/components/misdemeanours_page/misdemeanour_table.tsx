import {
  MISDEMEANOUR_OPTIONS,
  Misdemeanour,
  MisdemeanourKind,
} from "../../misdemeanours.types";
import styles from "./misdemeanour_table.module.css";

function MisdemeanourTable({ items = [] }: { items: Misdemeanour[] }) {
  return (
    <table className={styles.table}>
      <thead>
        <Head />
      </thead>

      <tbody>
        {items.map((m) => (
          <Row key={m.id} item={m} />
        ))}
      </tbody>
    </table>
  );
}

function Head() {
  return (
    <tr>
      <th>
        <p>Citizen ID</p>
      </th>
      <th>
        <p>Date</p>
      </th>
      <th>
        <p>Misdemeanour</p>
      </th>
      <th>
        <p>Punishment Idea</p>
      </th>
    </tr>
  );
}

function Row({ item: { citizenId, date, type } }: { item: Misdemeanour }) {
  return (
    <tr>
      <td>
        <p>{citizenId}</p>
      </td>
      <td>
        <p>{date.toLocaleDateString("en-GB")}</p>
      </td>
      <td className={styles.option}>
        <Option kind={type} />
      </td>
      <td>
        <img
          className={styles.idea}
          src={`https://picsum.photos/seed/${citizenId}/160/90`}
        />
      </td>
    </tr>
  );
}

function Option({ kind }: { kind: MisdemeanourKind }) {
  const misdemeanour = MISDEMEANOUR_OPTIONS.find((o) => o.type === kind);

  if (misdemeanour === undefined) {
    return <p>Mysterious Misdemeanour</p>;
  }

  return (
    <>
      <p>{misdemeanour.label}</p>
      <p>{misdemeanour.emoji}</p>
    </>
  );
}

export { MisdemeanourTable };
