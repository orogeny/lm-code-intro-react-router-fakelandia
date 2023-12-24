import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Header } from "./header";

describe("Header", () => {
  test("renders children", () => {
    render(
      <Header>
        <p>children</p>
      </Header>
    );

    expect(screen.getByText(/children/)).toBeInTheDocument();
  });
});
