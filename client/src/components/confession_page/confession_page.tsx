import { useContext, useState } from "react";
import { API_BASE_URL } from "../../environment_variables";
import { MisdemeanoursContext } from "../../hooks/misdemeanour_context/misdemeanour_context";
import { ConfessionForm, ConfessionFormData } from "./confession_form";
import styles from "./confession_page.module.css";
import {
  MISDEMEANOURS,
  Misdemeanour,
  MisdemeanourKind,
} from "../../misdemeanours.types";
import { useNavigate } from "react-router-dom";

type PostResponse = {
  success: boolean;
  justTalked: boolean;
  message: string;
};

function ConfessionPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const context = useContext(MisdemeanoursContext);
  const navigate = useNavigate();

  const handleConfession = (form: ConfessionFormData) => {
    fetch(`${API_BASE_URL}/confess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok)
          throw Error(`${response.status} ${response.statusText}`);

        return response.json();
      })
      .then((payload: PostResponse) => {
        if (!payload.success) throw Error(payload.message);

        if (!isMisdemeanourKind(form.reason))
          throw Error(`Reason "${form.reason}" is invalid`);

        if (!payload.justTalked) {
          const misdemeanour = createMisdemeanour(form.reason);

          context.addMisdemeanour(misdemeanour);

          context.changeFilter(form.reason);
        }

        navigate("/misdemeanours");
      })
      .catch((error) => {
        const message =
          error instanceof Error
            ? error.message
            : "Oops... Unable to save misdemeanour";
        setErrorMessage(message);
      });
  };

  return (
    <>
      <main className={styles.page}>
        <p>
          It's very difficult to catch people committing misdemeanours so we
          appreciatae it when citizens confess to us directly.
        </p>

        <p>
          However, if you're just having a hard day and need to vent then you're
          welcome to contact us here too. Up to you!
        </p>

        <ConfessionForm onConfess={handleConfession} />

        {errorMessage && <p className={styles.message}>{errorMessage}</p>}
      </main>
    </>
  );
}

function createMisdemeanour(reason: MisdemeanourKind) {
  return {
    id: crypto.randomUUID(),
    type: reason,
    citizenId: Math.floor(100 * Math.random()),
    date: new Date(),
  } as Misdemeanour;
}

function isMisdemeanourKind(value: string): value is MisdemeanourKind {
  return MISDEMEANOURS.some((m) => m === value);
}

export { ConfessionPage };
