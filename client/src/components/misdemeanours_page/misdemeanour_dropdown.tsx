import { ChangeEvent, useState } from "react";
import { MISDEMEANOUR_OPTIONS } from "../../misdemeanours.types";
import { MisdemeanoursFilter } from "../../hooks/misdemeanour_context/misdemeanour_context";

type MisdemeanourDropdownProps = {
  value: MisdemeanoursFilter;
  handleFilter: (filter: MisdemeanoursFilter) => void;
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

    const value = ev.target.value as MisdemeanoursFilter;

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

export { MisdemeanourDropdown };
