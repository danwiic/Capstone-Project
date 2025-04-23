import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

interface ProtectedRouteAccess {
  allowedRoles: "user" | "admin";
  element: React.ReactNode;
  redirectPath?: string;
}

export default function ProtectedRoute({
  allowedRoles,
  element,
  redirectPath = "/login",
}: ProtectedRouteAccess) {
  const { user } = useUserContext();

  const hasAccess = user?.role && allowedRoles.includes(user.role);
  console.log("sdhahsdhasdh",hasAccess);

  if (!hasAccess) {
    return <Navigate to={redirectPath} />;
  }

  return element;
}
