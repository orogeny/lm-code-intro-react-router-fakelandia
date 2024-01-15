import { useLocation, useNavigate } from "react-router-dom";
import styles from "./no_match.module.css";

function NoMatch() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p className={styles.message}>Unknown route "{location.pathname}"</p>
      <button
        className={styles.button}
        type="button"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );
}

export { NoMatch };
