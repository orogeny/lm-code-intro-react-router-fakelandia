import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./logo";

describe("Logo", () => {
  test("is rendered", () => {
    render(<Logo />);

    expect(screen.getByText(/justice/i)).toBeInTheDocument();
  });
});
