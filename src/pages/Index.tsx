
import { Navigate } from "react-router-dom";
import AccessPage from "./access/AccessPage";

const Index = () => {
  // In a real application, we would check for authentication here
  // For the prototype, we'll just show the login page
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <AccessPage />;
};

export default Index;
