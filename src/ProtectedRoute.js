import React from "react";
import { useAuth } from "./hooks/useAuth";
import NotFound from "./pages/NotFound";

const ProtectedRoute = ({ element, role }) => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user?.role === role) {
    return element;
  } else {
    return <NotFound />;
  }
};

export default ProtectedRoute;
