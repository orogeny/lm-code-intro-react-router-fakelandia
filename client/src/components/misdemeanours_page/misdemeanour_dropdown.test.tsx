import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MisdemeanourDropdown } from "./misdemeanour_dropdown";

describe("MisdemeanourDropdown", () => {
  test("select correct filter option", async () => {
    const user = userEvent.setup();

    const mockChangeFilter = vi.fn();

    const filterText = "Not Eating Your Vegetables";

    render(
      <MisdemeanourDropdown value="all" handleFilter={mockChangeFilter} />
    );

    await user.selectOptions(screen.getByRole("combobox"), filterText);

    expect(
      (screen.getByRole("option", { name: filterText }) as HTMLOptionElement)
        .selected
    ).toBe(true);

    expect(mockChangeFilter).toBeCalledTimes(1);
  });
});
