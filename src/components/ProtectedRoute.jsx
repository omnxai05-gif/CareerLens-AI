import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Spinner from "./Spinner.jsx";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner full />;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
