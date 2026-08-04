import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import {BrowserRouter} from "react-router-dom"

/*
  NOTES: Router setup

  BrowserRouter is the router that uses the normal browser URL, like /about.
  It listens to the browser history and tells React which route is active.

  Rule: BrowserRouter must wrap the whole app, so it goes here in main.jsx
  and not inside App.jsx. Any component that uses Link, NavLink, useNavigate,
  useParams or Outlet must sit inside this wrapper, otherwise React throws
  a "useNavigate may be used only in the context of a Router" error.

  Order of wrappers: BrowserRouter is outside ThemeProvider here, but either
  order works. Providers only need to be above the components that read them.

  StrictMode is commented out for now. In development StrictMode mounts every
  component twice on purpose, so useEffect runs twice and console logs appear
  twice. It is kept off here only so the effect logs are easier to read while
  learning. Turn it back on for real projects.
*/
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter >
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>

  // </StrictMode>,
);
