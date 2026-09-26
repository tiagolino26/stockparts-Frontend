import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import EquipamentoPage from "./pages/EquipamentoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/equipamento/:id"
          element={
            <ProtectedRoute>
              <EquipamentoPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
