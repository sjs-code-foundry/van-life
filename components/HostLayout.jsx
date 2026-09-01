import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function HostLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/host">Dashboard</Link>
          <Link to="/host/income">Income</Link>
          <Link to="/host/reviews">Reviews</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
