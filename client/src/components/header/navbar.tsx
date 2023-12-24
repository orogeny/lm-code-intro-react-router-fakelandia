import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

type NavigationLink = {
  label: string;
  path: string;
};

function Navbar({ links }: { links: NavigationLink[] }) {
  return (
    <>
      <nav className={styles.navbar}>
        {links.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export { Navbar, type NavigationLink };
