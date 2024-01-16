import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/main_layout";
import { HomePage } from "../home_page/home_page";
import { MisdemeanoursPage } from "../misdemeanours_page/misdemeanours_page";
import { ConfessionPage } from "../confession_page/confession_page";
import { NoMatch } from "../no_match/no_match";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="misdemeanours" element={<MisdemeanoursPage />} />
        <Route path="confession" element={<ConfessionPage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export { Router };
