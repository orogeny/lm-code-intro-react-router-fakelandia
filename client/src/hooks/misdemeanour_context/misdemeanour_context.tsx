import {
  Misdemeanour,
  MisdemeanourDto,
  MisdemeanourKind,
  fromDto,
} from "../../misdemeanours.types";
import { API_BASE_URL } from "../../environment_variables";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";

type MisdemeanoursFilter = "all" | MisdemeanourKind;

type MisdemeanoursContextValue = {
  isLoading: boolean;
  misdemeanours: Misdemeanour[];
  filter: MisdemeanoursFilter;
  error: Error | null;
  totalMisdemeanours: number;
  addMisdemeanour: (misdemeanour: Misdemeanour) => void;
  changeFilter: (kind: MisdemeanoursFilter) => void;
};

const MisdemeanoursContext = createContext<MisdemeanoursContextValue>(
  undefined!
);

function MisdemeanoursProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Misdemeanour[]>([]);
  const [filter, setFilter] = useState<MisdemeanoursFilter>("all");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setData((_) => []);
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

        setData(result.misdemeanours.map(fromDto));
      } catch (err) {
        setData((_) => []);

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

  const misdemeanours = useMemo<Misdemeanour[]>(
    () => data.filter((m) => filter === "all" || m.type === filter),
    [filter, data]
  );

  const addMisdemeanour = (misdemeanour: Misdemeanour) => {
    setData((prev) => [misdemeanour, ...prev]);
  };

  const changeFilter = (kind: MisdemeanoursFilter) => {
    setFilter(kind);
  };

  const value = {
    isLoading,
    misdemeanours,
    filter,
    totalMisdemeanours: data.length,
    addMisdemeanour,
    changeFilter,
    error,
  } as MisdemeanoursContextValue;

  return (
    <MisdemeanoursContext.Provider value={value}>
      {children}
    </MisdemeanoursContext.Provider>
  );
}

export {
  MisdemeanoursProvider,
  MisdemeanoursContext,
  type MisdemeanoursFilter,
};
