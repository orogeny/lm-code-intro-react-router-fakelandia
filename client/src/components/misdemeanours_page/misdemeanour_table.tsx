import { useContext, useState } from "react";
import {
  MISDEMEANOUR_OPTIONS,
  Misdemeanour,
  MisdemeanourKind,
} from "../../misdemeanours.types";
import styles from "./misdemeanour_table.module.css";
import { MisdemeanoursContext } from "../../hooks/misdemeanour_context/misdemeanour_context";
import { Loading } from "../loading/loading";
import {
  MisdemeanourDropdown,
  MisdemeanourDropdownValue,
} from "./misdemeanour_dropdown";

function MisdemeanourTable() {
  const [filter, setFilter] = useState<MisdemeanourDropdownValue>("all");
  const { isPending, misdemeanours, error } = useContext(MisdemeanoursContext);

  const handleFilter = (value: MisdemeanourDropdownValue) => {
    console.log("selected filter: ", value);
    setFilter((_) => value);
  };

  if (isPending) {
    return <Loading />;
  }

  if (error !== null) {
    return (
      <p>
        Error: <span>{error.message}</span>
      </p>
    );
  }

  const items = misdemeanours.filter(
    (m) => filter === "all" || m.type === filter
  );

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <p>Citizen ID</p>
          </th>
          <th>
            <p>Date</p>
          </th>
          <th>
            <MisdemeanourDropdown value={filter} handleFilter={handleFilter} />
            <p>Misdemeanour</p>
          </th>
          <th>
            <p>Punishment Idea</p>
          </th>
        </tr>
      </thead>

      <tbody>
        {items.map((m) => (
          <Row key={m.id} item={m} />
        ))}
      </tbody>
    </table>
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
