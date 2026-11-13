import { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthRequired from "./components/AuthRequired";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";
import HostLayout from "./components/HostLayout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import HostVans from "./pages/Host/HostVans";
import HostVanDetail from "./pages/Host/HostVanDetail";
import Reviews from "./pages/Host/Reviews";
import NotFound from "./pages/NotFound";

import "./server";

function App() {
  const [auth, setAuth] = useState(
    convertAuthState(localStorage.getItem("loggedin")),
  );

  function convertAuthState(str) {
    if (str === "true") {
      return true;
    } else {
      return null;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout auth={auth} setAuth={setAuth} />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login setAuth={setAuth} />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />
          <Route element={<AuthRequired auth={auth} />}>
            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id/*" element={<HostVanDetail />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
