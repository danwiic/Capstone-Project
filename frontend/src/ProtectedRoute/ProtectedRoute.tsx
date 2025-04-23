import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

interface ProtectedRouteAccess {
  allowedRoles: ("user" | "admin")[];
  element: React.ReactNode;
  redirectPath?: string;
}

export default function ProtectedRoute({
  allowedRoles,
  element,
  redirectPath = "/login",
}: ProtectedRouteAccess) {
  const { user } = useUserContext();

  if (!user) return <Navigate to={redirectPath} />;

  const hasAccess = user?.role && allowedRoles.includes(user.role);

  if (!hasAccess && user?.role) {
    return <Navigate to={"/"} />;
  }

  if (!user && !hasAccess) {
    return <Navigate to={redirectPath} />;
  }

  return element;
}
