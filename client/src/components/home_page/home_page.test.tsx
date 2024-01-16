import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HomePage } from "./home_page";
import { MisdemeanoursProvider } from "../../hooks/misdemeanour_context/misdemeanour_context";

describe("HomePage", () => {
  test("renders", async () => {
    render(
      <MisdemeanoursProvider>
        <HomePage />
      </MisdemeanoursProvider>
    );

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});
