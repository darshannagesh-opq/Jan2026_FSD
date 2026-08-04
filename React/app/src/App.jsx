import "./App.css";
// import ContextAPI_class from './components/ContextAPI_class'
// import GlobalContext from './components/GlobalContext'
// import PropDrilling from './components/PropDrilling'
// import PropsRecap from './components/PropsRecap'
// import UseContext_class from './components/UseContext_class'
// import Parent from './ReactMemo/Parent'
// import UseEffect_basics from './useEffect/UseEffect_basics'
// import UseEffect_Ex1 from './useEffect/UseEffect_Ex1'
// import SlowEx from './useMemo/SlowEx'
// import FocusInput from './useRef/FocusInput'
// import RenderCounter from './useRef/RenderCounter'
// import StopWatch from './useRef/StopWatch'
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";

/*
  NOTES: Routing and lazy loading

  Routes is the box that holds all the routes. It looks at the current URL and
  renders only the one Route that matches best. Only one match wins.

  Route takes a path and an element. The element is real JSX, so you can pass
  props to it, for example element={<ProtectedRoute isLoggedIn={isLoggedIn}>}.
*/

/*
  NOTES: Code splitting with lazy and Suspense

  Normally every import goes into one big JavaScript bundle. The user downloads
  the code for every page even if they only open the home page.

  lazy(() => import("./Page")) tells the bundler to put that component in a
  separate file. The file is downloaded only when the user visits that route.
  This makes the first page load faster.

  lazy returns a promise, so React needs something to show while the file is
  downloading. That is what Suspense fallback is for. Without a Suspense above
  a lazy component, React throws an error.

  Compare the commented normal imports below with the lazy ones above them.
  Both work, only the loading behaviour is different.
*/
// import Users from "./components/Users";
const Users = lazy(() => import("./components/Users"));
const About = lazy(() => import("./components/About"));
const Home = lazy(() => import("./components/Home"));
const UseEffect_Ex1 = lazy(() => import("./useEffect/UseEffect_Ex1"));
const Login = lazy(() => import("./Login"));
const Notfound = lazy(() => import("./Notfound"));
const Layout = lazy(() => import("./Layout"));
// import About from "./components/About";
// import Home from "./components/Home";
// import Login from "./Login";
// import Notfound from "./Notfound";
// import Layout from "./Layout";
// import UseEffect_Ex1 from "./useEffect/UseEffect_Ex1";
function App() {
  // Hardcoded for the demo. In a real app this comes from context, redux
  // or a token in localStorage.
  const isLoggedIn = true;
  return (
    <>
      {/* Suspense must be above every lazy component. The fallback shows
          while the route file is still downloading. */}
      <Suspense fallback={<h3>Loading..</h3>}>
        <Routes>
          {/* <div className="container py-4" style={{maxWidth: 600}}> */}
          {/* <h2 className='text-center mb-4 text-primary'>React Context</h2>
      <div className='card p-4 mb-4'><PropsRecap /></div>
      <div className='card p-4 mb-4'><PropDrilling /></div>
      <div className='card p-4 mb-4'><ContextAPI_class /></div>
      <div className='card p-4 mb-4'><UseContext_class /></div>
      <div className='card p-4 mb-4'><GlobalContext /></div> */}
          {/* <div className='card p-4 mb-4'><Parent /></div>  */}

          {/* NESTED ROUTES
              This parent Route has no element of its own to show as a page.
              Layout holds the Navbar and the footer, and the child route
              renders inside Layout at the Outlet spot. So the Navbar stays
              on screen and only the middle part changes. */}
          <Route path="/" element={<Layout />}>

            {/* index means the default child. It matches the parent path "/"
                exactly. Use index instead of path="/" for the default child. */}
            <Route index element={<Home />} />

            <Route path="/about" element={<About />} />

            {/* PROTECTED ROUTE
                ProtectedRoute is a normal component that wraps the page.
                If the user is logged in it returns children, which is Users.
                If not, it redirects to the login page. */}
            <Route
              path="/users"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Users />
                </ProtectedRoute>
              }
            />

            {/* URL PARAM
                :id is a placeholder. /users/1 and /users/7 both match this
                route. The component reads the value with useParams. */}
            <Route path="/users/:id" element={<UseEffect_Ex1 />} />

            <Route path="/login" element={<Login />} />

            {/* CATCH ALL
                * matches anything that no earlier route matched. Keep it last
                so it only runs when nothing else fits. This is the 404 page. */}
            <Route path="/*" element={<Notfound />} />
          </Route>

          {/* </div> */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
