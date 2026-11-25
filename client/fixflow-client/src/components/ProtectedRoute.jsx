import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRole }) {
  const { user, loading } = useAuth();

  // Wait until login status is checked
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  // If user is not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user's role is not allowed
  if (user.role !== allowedRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  // If user is authorized
  return <Outlet />;
}

export default ProtectedRoute;
