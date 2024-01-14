import {
  Misdemeanour,
  MisdemeanourDto,
  fromDto,
} from "../../misdemeanours.types";
import { useFetch } from "../use_fetch/use_fetch";
import { API_BASE_URL } from "../../environment_variables";
import { createContext, PropsWithChildren } from "react";

type MisdemeanoursContextValue = {
  isPending: boolean;
  misdemeanours: Misdemeanour[];
  error: Error;
};

const MisdemeanoursContext = createContext<MisdemeanoursContextValue>(
  undefined!
);

function MisdemeanoursProvider({ children }: PropsWithChildren) {
  const { data, error } = useFetch<{ misdemeanours: MisdemeanourDto[] }>(
    `${API_BASE_URL}/misdemeanours/20`
  );

  const isPending = data === null && error === null;
  const misdemeanours = data === null ? [] : data.misdemeanours.map(fromDto);

  const value = {
    isPending,
    misdemeanours,
    error,
  } as MisdemeanoursContextValue;

  return (
    <MisdemeanoursContext.Provider value={value}>
      {children}
    </MisdemeanoursContext.Provider>
  );
}

// function useMisdemeanours() {
//   const context = useContext(MisdemeanoursContext);

//   if (context === undefined) {
//     throw new Error(
//       "useMisdemeanours must be called within a Misdemenours context"
//     );
//   }

//   return context;
// }

export { MisdemeanoursProvider, MisdemeanoursContext };
