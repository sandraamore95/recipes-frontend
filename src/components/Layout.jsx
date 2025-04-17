// src/components/Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="mt-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
