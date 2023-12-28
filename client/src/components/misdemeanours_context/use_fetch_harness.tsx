import { useState } from "react";
import { MisdemeanourDto } from "./misdemeanours.types";
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

  const { idle, loading, loaded, failed, data, error } =
    useFetch<THarnessResponse>(url);

  return (
    <div>
      <h1>UseFetch Test Harness</h1>

      <div>
        <button onClick={() => setUrl((_) => "")}>clear</button>
        <button
          onClick={() => {
            console.log("fetching data");
            setUrl((_) => validUrl);
          }}
        >
          fetch
        </button>
        <button onClick={() => setUrl((_) => invalidUrl)}>unknown</button>
      </div>

      {url.length === 0 ? null : <p>{url}</p>}

      <div>
        {idle ? <p>idle</p> : null}
        {loading ? <p>loading</p> : null}
        {loaded ? <p>loaded</p> : null}
        {failed ? <p>failed</p> : null}
      </div>

      {data && <p>data</p>}

      {error && <p>error</p>}
    </div>
  );
}

export { UseFetchHarness };
