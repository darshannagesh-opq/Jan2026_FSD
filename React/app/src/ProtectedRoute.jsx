import { Navigate } from "react-router-dom";

/*
  NOTES: Protected route, wrapper component pattern

  A protected route is a page that only a logged in user should see, like a
  dashboard or a profile page.

  This is the wrapper style. The page is passed in as children, so in App.jsx
  it looks like this:

      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <Users />
      </ProtectedRoute>

  If the user is allowed, we simply return children and the page shows.
  If not, we return Navigate, which is a redirect written as JSX. Rendering
  Navigate immediately sends the user to /login.

  Why replace is used: replace true swaps the current entry in the browser
  history instead of adding a new one. Without it the blocked URL stays in the
  history, so pressing Back sends the user to the blocked page, which bounces
  them to login again, and they get stuck in a loop.

  Compare this file with withAuth.jsx. Same goal, different style. This one is
  easier to read in the route list. The HOC one is better when the rule belongs
  to the component itself.

  Important: this only hides the page in the browser. It is not real security.
  The server must always check the token again before sending data.
*/
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
