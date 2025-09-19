import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token"); // or cookie check

  if (!token) {
    alert("⚠️ Please login first!");
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;

