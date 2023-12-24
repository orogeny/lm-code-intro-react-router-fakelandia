import { Outlet } from "react-router-dom";
import { Header } from "../header/header";
import { Navbar } from "../header/navbar";
import { Logo } from "../header/logo";

const links = [
  { label: "Home", path: "/" },
  { label: "Misdemeanours", path: "/misdemeanours" },
  { label: "Confess To Us", path: "/confession" },
];

function MainLayout() {
  return (
    <>
      <Header>
        <Logo />
        <Navbar links={links} />
      </Header>
      <Outlet />
    </>
  );
}

export { MainLayout };
