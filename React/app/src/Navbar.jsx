import { Link, NavLink } from "react-router-dom"

/*
  NOTES: Link and NavLink

  Never use a plain <a href="/about"> inside a React Router app. An anchor tag
  makes the browser reload the whole page, so all the React state is lost and
  the app starts again from zero.

  Link renders an anchor but stops the browser reload. It only changes the URL
  and lets the router swap the component. This is what keeps it a single page
  application.

  NavLink is Link plus one extra feature. It knows whether its own route is the
  active one right now. It gives you an isActive boolean in className or style,
  so you can highlight the current page in the menu. Use NavLink for menu items
  and plain Link everywhere else.

  The className below is a function, not a string. React Router calls it with
  { isActive } and uses whatever string you return.
*/
export const Navbar = () => {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
        {/* isActive is true when the current URL is /users */}
        <NavLink to="/users" className={({isActive})=> (isActive ? "active-link" : "")}>Users</NavLink>
    </nav>
  )
}
export default Navbar;
