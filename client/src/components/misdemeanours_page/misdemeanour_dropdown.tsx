import { ChangeEvent, useState } from "react";
import {
  MISDEMEANOUR_OPTIONS,
  MisdemeanourKind,
} from "../../misdemeanours.types";

type MisdemeanourDropdownValue = "all" | MisdemeanourKind;

type MisdemeanourDropdownProps = {
  value: MisdemeanourDropdownValue;
  handleFilter: (filter: MisdemeanourDropdownValue) => void;
};

const FILTER_OPTIONS = MISDEMEANOUR_OPTIONS.map(({ type, label }) => ({
  value: type,
  label,
}));

function MisdemeanourDropdown({
  value,
  handleFilter,
}: MisdemeanourDropdownProps) {
  const [filter, setFilter] = useState(value);

  const handleChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();

    const value = ev.target.value as MisdemeanourDropdownValue;

    setFilter((_) => value);

    if (handleFilter !== undefined) {
      handleFilter(value);
    }
  };

  return (
    <select value={filter} onChange={handleChange}>
      <option value="all">All misdemeanours</option>
      {FILTER_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export { MisdemeanourDropdown, type MisdemeanourDropdownValue };
