import {
  Misdemeanour,
  MisdemeanourDto,
  fromDto,
} from "../../misdemeanours.types";
import { API_BASE_URL } from "../../environment_variables";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ConfessionFormData } from "../../components/confession_page/confession_form";

type MisdemeanoursContextValue = {
  isLoading: boolean;
  misdemeanours: Misdemeanour[];
  error: Error;
  // addConfession: (input: ConfessionFormData) => void
};

const MisdemeanoursContext = createContext<MisdemeanoursContextValue>(
  undefined!
);

function MisdemeanoursProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setMisdemeanours((_) => []);
    setError((_) => null);

    async function fetchData() {
      try {
        const response = await fetch(`${API_BASE_URL}/misdemeanours/20`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = (await response.json()) as {
          misdemeanours: MisdemeanourDto[];
        };

        setMisdemeanours(result.misdemeanours.map(fromDto));
      } catch (err) {
        setMisdemeanours((_) => []);

        if (err instanceof DOMException) {
          setError((_) => null);
        } else {
          const failure =
            err instanceof Error
              ? err
              : new Error("Failed to load misdemeanours");

          setError((_) => failure);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, []);

  const value = {
    isLoading,
    misdemeanours,
    error,
  } as MisdemeanoursContextValue;

  return (
    <MisdemeanoursContext.Provider value={value}>
      {children}
    </MisdemeanoursContext.Provider>
  );
}

export { MisdemeanoursProvider, MisdemeanoursContext };
