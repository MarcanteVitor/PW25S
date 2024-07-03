import { NavBar } from "@/components/NavBar";
import AuthService from "@/service/AuthService";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function AuthenticatedRoutesCheckout() {
  const location = useLocation();
  const isAuthenticated = AuthService.isAuthenticated();

  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
