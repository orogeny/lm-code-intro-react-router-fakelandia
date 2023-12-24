import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HomePage } from "./home_page";

describe("HomePage", () => {
  test("renders", () => {
    render(<HomePage />);

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});
