import CreatorDashboard from "./pages/CreatorDashboard";
import PlayerDashboard from "./pages/PlayerDashboard";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/creator-dashboard"
        element={
          <ProtectedRoute element={<CreatorDashboard />} role="creator" />
        }
      />
      <Route
        path="/player-dashboard"
        element={<ProtectedRoute element={<PlayerDashboard />} role="player" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
