import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/main_layout";
import { DummyPage } from "../dummy_page/dummy_page";
import { HomePage } from "../home_page/home_page";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="misdemeanours" element={<DummyPage />} />
        <Route path="confession" element={<DummyPage />} />
      </Route>
    </Routes>
  );
}

export { Router };
