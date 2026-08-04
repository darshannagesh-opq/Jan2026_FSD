import { useNavigate } from "react-router-dom"

/*
  NOTES: Programmatic navigation with useNavigate

  Link is for navigation the user clicks directly. But sometimes you must
  navigate from inside code, after something happens. Examples: after a login
  succeeds, after a form is saved, after a payment is done.

  useNavigate gives you a function. Call navigate("/") and the router moves to
  that route.

  Useful forms:
    navigate("/")                    go to home
    navigate("/", { replace: true }) go to home and remove the current page
                                     from history, so Back does not return here
    navigate(-1)                     go back one page, same as the Back button

  For a real login page use replace true, otherwise the user can press Back and
  land on the login screen again after they are already logged in.
*/
const Login = () => {
    const navigate = useNavigate()
    const handleLogin = () =>{
        // in a real app this would be an API call that returns a token
        const success = true
        if (success){
            navigate("/")
        }
    }
  return (
    <button onClick={handleLogin}>Login</button>
  )
}

export default Login
