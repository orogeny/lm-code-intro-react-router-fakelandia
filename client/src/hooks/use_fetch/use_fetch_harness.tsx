import { useState } from "react";
import { MisdemeanourDto } from "../../misdemeanours.types";
import { useFetch } from "./use_fetch";

type THarnessResponse = {
  misdemeanours: MisdemeanourDto[];
};

function UseFetchHarness({
  validUrl,
  invalidUrl,
}: {
  validUrl: string;
  invalidUrl: string;
}) {
  const [url, setUrl] = useState("");

  const { isIdle, isLoading, isLoaded, isError, data, error } =
    useFetch<THarnessResponse>(url);

  return (
    <div>
      <h1>useFetch Test Harness</h1>

      <div>
        <button onClick={() => setUrl((_) => "")}>clear</button>
        <button
          onClick={() => {
            setUrl((_) => validUrl);
          }}
        >
          fetch
        </button>
        <button onClick={() => setUrl((_) => invalidUrl)}>unknown</button>
      </div>

      {url.length === 0 ? null : <p>{url}</p>}

      <div>
        {isIdle ? <p>isIdle</p> : null}
        {isLoading ? <p>isLoading</p> : null}
        {isLoaded ? <p>isLoaded</p> : null}
        {isError ? <p>isError</p> : null}
      </div>

      {data && <p>data</p>}

      {error && <p>error</p>}
    </div>
  );
}

export { UseFetchHarness };
