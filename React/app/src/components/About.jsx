import withAuth from "../withAuth"

/*
  NOTES: Using a HOC

  About itself is a plain component. The protection is added at the export line
  at the bottom, where withAuth wraps it.

  Because of that, the route in App.jsx stays clean and simple:
      <Route path="/about" element={<About />} />
  and it is still protected.

  Trade off: reading App.jsx alone you cannot tell that /about is protected.
  You have to open this file to know. That is the main downside of the HOC
  style compared to the wrapper style in ProtectedRoute.jsx.

  Right now withAuth has isLoggedIn hardcoded false, so clicking About always
  sends you to the login page. That is the demo behaviour, not a bug.

  The eslint disable line below is only there because this file exports a
  wrapped component instead of the component itself, which confuses the fast
  refresh rule.
*/

// eslint-disable-next-line react-refresh/only-export-components
const About = () => {
  return (
    <div>About</div>
  )
}

// export the protected version, not About itself
export default withAuth(About)
