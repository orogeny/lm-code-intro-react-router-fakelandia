import { useContext } from "react";
import {
  MISDEMEANOUR_OPTIONS,
  Misdemeanour,
  MisdemeanourKind,
} from "../../misdemeanours.types";
import styles from "./misdemeanour_table.module.css";
import {
  MisdemeanoursContext,
  MisdemeanoursFilter,
} from "../../hooks/misdemeanour_context/misdemeanour_context";
import { Loading } from "../loading/loading";
import { MisdemeanourDropdown } from "./misdemeanour_dropdown";

function MisdemeanourTable() {
  const context = useContext(MisdemeanoursContext);

  const handleFilter = (value: MisdemeanoursFilter) => {
    context.changeFilter(value);
  };

  if (context.isLoading) {
    return <Loading />;
  }

  if (context.error !== null) {
    return (
      <p>
        Error: <span>{context.error.message}</span>
      </p>
    );
  }

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
            <MisdemeanourDropdown
              value={context.filter}
              handleFilter={handleFilter}
            />
            <p>Misdemeanour</p>
          </th>
          <th>
            <p>Punishment Idea</p>
          </th>
        </tr>
      </thead>

      <tbody>
        {context.misdemeanours.map((m) => (
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
