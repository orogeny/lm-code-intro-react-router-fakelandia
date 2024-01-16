import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { StatCard } from "./stat_card";

describe("StatCard", () => {
  test("displays stat name and value", () => {
    const statName = "Meaningless";
    const statValue = 42;

    render(<StatCard name={statName} value={statValue} />);

    expect(screen.getByText(new RegExp(statName))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${statValue}`))).toBeInTheDocument();
  });

  test("no value, display N/A", () => {
    render(<StatCard name="Unknown" />);

    expect(screen.getByText(new RegExp("N/A"))).toBeInTheDocument();
  });

  test("undefined value, display N/A", () => {
    render(<StatCard name="Unknown" value={undefined} />);

    expect(screen.getByText(new RegExp("N/A"))).toBeInTheDocument();
  });
});
