import { Link } from "react-router-dom"

/*
  NOTES: 404 page

  This component is mapped to path="/*" in App.jsx. The star matches every URL
  that no other route matched, so any wrong address lands here.

  Keep this route last in the list. Routes picks the best match, but writing it
  last also keeps the file readable.

  Always give the user a way back, so a Link to home is added here.
*/
const Notfound = () => {
  return (
    <>
        <h1>404 - Page Notfound</h1>
    <Link to="/">Go back home</Link>
    </>

  )
}

export default Notfound
