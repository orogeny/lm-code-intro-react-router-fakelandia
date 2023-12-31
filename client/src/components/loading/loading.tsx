import { useEffect, useState } from "react";
import styles from "./loading.module.css";

function Loading({ text = "Loading" }: { text?: string }) {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      setContent((prev) => (prev === `${text}...` ? text : `${prev}.`));
    }, 300);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className={styles.container}>
      <p className={styles.loading}>{content}</p>
    </div>
  );
}

export { Loading };
