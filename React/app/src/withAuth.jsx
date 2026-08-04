import { Navigate } from "react-router-dom";

/*
  NOTES: Higher Order Component (HOC)

  A HOC is just a function. It takes a component and returns a new component
  with extra behaviour added around it. It is a plain JavaScript idea, not a
  special React feature.

  Shape to remember:
      const withSomething = (Component) => (props) => <Component {...props} />

  Here withAuth adds the login check. Usage is in About.jsx:
      export default withAuth(About)

  So About is no longer exported directly. The wrapped version is exported, and
  the check runs before About is allowed to render.

  Why {...props} matters: the wrapper receives the props meant for the inner
  component. If you forget to spread them, the inner component gets nothing and
  silently breaks.

  HOC vs the wrapper style in ProtectedRoute.jsx:
    HOC        the rule is attached to the component, so it applies everywhere
               that component is used, in any route
    Wrapper    the rule is visible in the route list, so it is easier to see
               which routes are protected when you read App.jsx

  DEMO NOTE: isLoggedIn is hardcoded false here on purpose, so /about always
  redirects to login. In App.jsx isLoggedIn is true, so /users passes. That way
  both outcomes can be seen in one running app. Replace this with real auth
  state from context or a token later.
*/
const withAuth = (Component) => {
  // this returned function is the new component React will render
  return (props) => {
    const isLoggedIn = false;
    if (isLoggedIn) {
      // pass every prop through to the original component
      return <Component {...props} />;
    }
    return <Navigate to="/login" replace />;
  };
};

export default withAuth;
