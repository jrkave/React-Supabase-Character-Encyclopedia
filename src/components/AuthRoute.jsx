import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRoute = () => {
  const { auth } = useAuth(); // Fetch auth from Auth Context
  const location = useLocation();

  return auth ? (
    // Placeholder for protected component
    <Outlet />
  ) : (
    // Redirect to login route
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;
