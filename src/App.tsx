import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Today from "./pages/Today";
import Add from "./pages/Add";
import Library from "./pages/Library";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Today />} />
        <Route path="add" element={<Add />} />
        <Route path="library" element={<Library />} />
        <Route path="insights" element={<Insights />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
