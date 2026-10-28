import { Navigate, Outlet } from "react-router-dom";

export default function AuthRequired(props) {
  if (!props.auth) {
    return (
      <Navigate to="/login" state={{ message: "You must log in first." }} />
    );
  }

  return <Outlet />;
}
