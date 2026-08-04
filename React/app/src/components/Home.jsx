/*
  NOTES: Index route

  This is the default page of the app. In App.jsx it is written as
      <Route index element={<Home />} />
  inside the Layout route.

  index means "show this when the URL is exactly the parent path", which is /
  here. Use index for the default child instead of writing path="/" again.
*/

const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home
