import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { UseFetchHarness } from "./use_fetch_harness";
import { server } from "../../mocks/node";
import { delay, HttpResponse, http } from "msw";
import { API_BASE_URL } from "../../environment_variables";

describe("useFetch hook", () => {
  test("harness displayed", () => {
    render(
      <UseFetchHarness
        validUrl={`${API_BASE_URL}/misdemeanours/0`}
        invalidUrl={`${API_BASE_URL}/crimes`}
      />
    );

    // assert component is displayed
    expect(screen.getByText(/harness/i)).toBeInTheDocument();

    // assert initial state
    expect(screen.queryByText(/idle/)).toBeInTheDocument();
    expect(screen.queryByText(/loading/)).toBeNull();
    expect(screen.queryByText(/loaded/)).toBeNull();
    expect(screen.queryByText(/failed/)).toBeNull();
    expect(screen.queryByText(/data/)).toBeNull();
    expect(screen.queryByText(/error/)).toBeNull();
  });

  test("fetch data", async () => {
    server.use(
      http.get(`${API_BASE_URL}/misdemeanours/0`, async () => {
        await delay(750);
        return HttpResponse.json([]);
      })
    );

    // Setup test actor
    const actor = userEvent.setup();

    render(
      <UseFetchHarness
        validUrl={`${API_BASE_URL}/misdemeanours/0`}
        invalidUrl={`${API_BASE_URL}/crimes`}
      />
    );

    // assert data request initiated
    const fetchButton = screen.getByText("fetch");

    await actor.click(fetchButton);

    await waitForElementToBeRemoved(screen.queryByText(/loading/));

    // assert state change loading -> loaded
    expect(screen.getByText(/loaded/)).toBeInTheDocument();
    expect(screen.getByText(/data/)).toBeInTheDocument();
  });

  test("fetch invalid url", async () => {
    server.use(
      http.get(`${API_BASE_URL}/crimes`, async () => {
        await delay(750);
        return new HttpResponse(null, {
          status: 404,
          statusText: "Not Found",
        });
      })
    );

    const actor = userEvent.setup();

    render(
      <UseFetchHarness
        validUrl={`${API_BASE_URL}/misdemeanours/0`}
        invalidUrl={`${API_BASE_URL}/crimes`}
      />
    );

    // assert data request initiated
    const unknownButton = screen.getByText("unknown");

    await actor.click(unknownButton);

    await waitForElementToBeRemoved(screen.queryByText(/loading/));

    expect(screen.getByText(/failed/)).toBeInTheDocument();
    expect(screen.getByText(/error/)).toBeInTheDocument();
  });
});
