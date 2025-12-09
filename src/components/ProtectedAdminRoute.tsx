import { Navigate } from "react-router-dom";

interface ProtectedAdminRouteProps {
  user: any;
  loading: boolean;
  children: React.ReactNode;
}

const ProtectedAdminRoute = ({
  user,
  loading,
  children,
}: ProtectedAdminRouteProps) => {
  if (loading) return <div>Loading...</div>; // wait until auth is checked
  if (!user) return <Navigate to="/" replace />; // redirect if not logged in
  return <>{children}</>;
};

export default ProtectedAdminRoute;
