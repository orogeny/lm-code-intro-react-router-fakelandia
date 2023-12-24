import { describe, expect, test } from "vitest";
import { Navbar } from "./navbar";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Navbar", () => {
  test("renders link", () => {
    const mockLink = { label: "Mock", path: "/mock-path" };

    render(
      <MemoryRouter>
        <Navbar links={[mockLink]} />
      </MemoryRouter>
    );

    const mockedLink = screen.getByText(mockLink.label);

    expect(mockedLink).toBeInTheDocument();
  });
});
