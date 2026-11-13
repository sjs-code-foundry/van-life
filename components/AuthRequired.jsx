import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function AuthRequired(props) {
  const location = useLocation();

  if (!props.auth) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "You must log in first.",
          destination: location.pathname,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
