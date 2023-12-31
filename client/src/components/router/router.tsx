import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/main_layout";
// import { DummyPage } from "../dummy_page/dummy_page";
import { HomePage } from "../home_page/home_page";
import { MisdemeanoursPage } from "../misdemeanours_page/misdemeanours_page";
import { ConfessionPage } from "../confession_page/confession_page";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="misdemeanours" element={<MisdemeanoursPage />} />
        <Route path="confession" element={<ConfessionPage />} />
      </Route>
    </Routes>
  );
}

export { Router };
