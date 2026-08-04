/*
  NOTES: Protected page

  Nothing special inside this component. It is a plain page.

  The protection lives in App.jsx, where this component is wrapped:
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <Users />
      </ProtectedRoute>

  This is the wrapper style, so the component stays unaware of the auth rule.
  Compare with About.jsx, which carries its own rule through the HOC.
*/
const Users = () => {
  return (
    <div>Users</div>
  )
}

export default Users
