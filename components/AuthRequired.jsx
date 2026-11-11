import { Navigate, Outlet } from "react-router-dom";

export default function AuthRequired(props) {
  const isLoggedIn = localStorage.getItem("loggedin");
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    return (
      <Navigate to="/login" state={{ message: "You must log in first." }} />
    );
  }

  return <Outlet />;
}
