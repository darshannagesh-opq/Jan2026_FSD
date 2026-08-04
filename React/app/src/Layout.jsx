import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

/*
  NOTES: Layout route

  A layout is the shared frame of the app. Navbar on top, footer at the
  bottom, and the page content in the middle.

  Outlet is the hole where the matched child route is rendered. In App.jsx
  this Layout is the parent Route and Home, About, Users and the others are
  its children. When the URL changes, only the part inside Outlet changes.
  The Navbar and footer are not unmounted and not re rendered from scratch.

  Without a layout route you would have to put <Navbar /> inside every single
  page component, and it would remount on every navigation.
*/
const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        {/* the active child route renders here */}
        <Outlet />
      </main>
      <footer>My App 2026</footer>
    </div>
  );
};

export default Layout;
