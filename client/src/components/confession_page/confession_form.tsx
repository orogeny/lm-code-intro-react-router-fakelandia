import { ChangeEvent, FormEvent, useState } from "react";
import {
  JUST_TALK,
  JustTalk,
  MISDEMEANOUR_OPTIONS,
  MisdemeanourKind,
} from "../../misdemeanours.types";
import styles from "./confession_form.module.css";

type FormInputElements =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

const REASON_OPTIONS = [{ value: JUST_TALK, label: "Just Talk" }].concat(
  MISDEMEANOUR_OPTIONS.map(({ type, label }) => ({ value: type, label }))
);

type ReasonKind = JustTalk | MisdemeanourKind;

type ConfessionFormData = {
  subject: string;
  reason: string;
  details: string;
};

type FormDataKeys = keyof ConfessionFormData;

const INITIAL_STATE = {
  subject: "",
  reason: "",
  details: "",
} as ConfessionFormData;

const validator = {
  subject: (v: string) => (v.length === 0 ? "*required" : ""),
  reason: (v: string) =>
    REASON_OPTIONS.some((ro) => ro.value === v) ? "" : "*required",
  details: (v: string) =>
    v.length < 17 ? "*must be 17 characters or more" : "",
};

type ConfessionFormProps = {
  onConfess?: (form: ConfessionFormData) => void;
};

function ConfessionForm(props: ConfessionFormProps) {
  const [form, setForm] = useState<ConfessionFormData>(INITIAL_STATE);

  const errors = Object.entries(form).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [k as FormDataKeys]: validator[k as FormDataKeys](v),
    }),
    {}
  ) as ConfessionFormData;

  const handleChange = (ev: ChangeEvent<FormInputElements>) => {
    setForm((prev) => ({ ...prev, [ev.target.id]: ev.target.value }));
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (props.onConfess !== undefined) {
      props.onConfess(form);
    }
  };

  const canSubmit = Object.entries(errors).every(([_, v]) => v === "");

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.control}>
          <label className={styles.label} htmlFor="subject">
            Subject
          </label>
          <div className={styles.entry}>
            <input
              type="text"
              className={styles.input}
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="misdemeanour subject"
            />
            <p className={styles.error}>{errors.subject}</p>
          </div>
        </div>

        <div className={styles.control}>
          <label className={styles.label} htmlFor="reason">
            Reason for contact
          </label>
          <div className={styles.entry}>
            <select
              className={styles.select}
              id="reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
            >
              <option value="">select a reason</option>
              {REASON_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <p className={styles.error}>{errors.reason}</p>
          </div>
        </div>

        <div className={styles.entry}>
          <textarea
            className={styles.textarea}
            id="details"
            name="details"
            cols={60}
            rows={4}
            value={form.details}
            onChange={handleChange}
          ></textarea>
          <p className={styles.error}>{errors.details}</p>
        </div>

        <button type="submit" className={styles.button} disabled={!canSubmit}>
          Confess
        </button>
      </form>
    </section>
  );
}

export { ConfessionForm, type ConfessionFormData };
