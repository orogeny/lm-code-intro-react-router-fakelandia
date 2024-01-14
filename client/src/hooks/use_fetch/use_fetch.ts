import { useEffect, useState } from "react";

type State<T> = {
  isIdle: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  data: T | null;
  error: Error | null;
};

function useFetch<T>(url: string = "") {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setData((_) => null);
    setError((_) => null);

    async function fetchData() {
      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        const result = (await response.json()) as T;

        setData(result);
      } catch (err) {
        setData((_) => null);

        if (err instanceof DOMException) {
          setError(null);
        } else if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Fetch failed"));
        }
      }
    }

    if (url.length > 0) {
      fetchData();
    }

    return () => controller.abort();
  }, [url]);

  return {
    isIdle: url.length === 0,
    isLoading: url.length > 0 && data === null && error === null,
    isLoaded: data !== null,
    isError: error !== null,
    data,
    error,
  } as State<T>;
}

export { useFetch };
