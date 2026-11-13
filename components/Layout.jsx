import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <div className="site-wrapper">
      <Header auth={props.auth} setAuth={props.setAuth} />
      <Outlet />
      <Footer />
    </div>
  );
}
