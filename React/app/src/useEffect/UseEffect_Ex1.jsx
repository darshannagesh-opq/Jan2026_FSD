import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// const URL = `https://jsonplaceholder.typicode.com/users/${id}`;

/*
  NOTES: Data fetching with useEffect plus a URL param

  This component is mapped to /users/:id in App.jsx. Open /users/1 or /users/3
  and it fetches that one user.

  useParams reads the placeholder from the URL. The key name must match the
  route exactly. Route is path="/users/:id", so useParams gives you { id }.
  The value is always a string, so convert it with Number if you need a number.

  THREE STATES, ALWAYS
  Any request can be loading, failed, or done. Keep one piece of state for each
  so the screen can never show a half finished result:
      users    the data, starts as null because nothing has arrived yet
      loading  true while the request is in flight
      isError  an object so we can keep the message and show it to the user

  Why users starts as null and not []: this endpoint returns one object, not a
  list. Starting at null also lets you tell "not loaded yet" apart from "loaded
  and empty".

  Guard clauses: the loading and error checks return early, before the main
  JSX. Without them the component would try to read users.name while users is
  still null and crash.

  THE DEPENDENCY ARRAY IS [id]
  This is the important part. The effect refetches whenever the URL param
  changes. Going from /users/1 to /users/2 does not unmount this component,
  React just reuses it with a new id. With [] the data would be stale and the
  page would keep showing user 1. With no array at all it would fetch after
  every render, which is an infinite loop because setting state causes a render.

  async and useEffect: the effect callback itself must not be async, because
  useEffect expects either nothing or a cleanup function back, and an async
  function returns a promise. So the async work goes in a separate function
  that the effect calls.

  fetch does not throw on 404 or 500. It only throws when the network fails.
  That is why response.ok is checked by hand and an error is thrown manually.

  finally always runs, on success and on failure, so it is the right place to
  set loading back to false. Otherwise a failed request would spin forever.

  BUG TO FIX: line below calls fetchUsersData(URL) but URL does not exist, the
  const is commented out at the top. It works only because the function ignores
  its argument and builds the address itself. Change the call to
  fetchUsersData() so it is not misleading.

  MISSING IN THIS DEMO: a cleanup with AbortController. If the user switches
  from user 1 to user 2 quickly, the slower first response can arrive last and
  overwrite the newer data. This is called a race condition. The real fix is to
  abort the old request in the cleanup function.
*/

const UseEffect_Ex1 = () => {
  const {id} = useParams()
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState({ status: false, msg: "" });

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      console.log(response);
      // fetch does not throw for 404 or 500, so check it yourself
      if (!response.ok) {
        throw new Error("Request Failed!");
      }
      const data = await response.json();

      setUsers(data);
      setIsError({ status: false, msg: "" });
    } catch (error) {
      setIsError({ status: true, msg: error.message });
    } finally {
      // runs on both success and failure
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsersData(URL);
    // [id] means refetch when the URL param changes
  }, [id]);

  // guard clause, stops the render before users is read
  if (loading) {
    return <h2>Loading....</h2>;
  }

  if (isError.status) {
    return <h2>Something went wrong: {isError.msg}</h2>;
  }
  return (
    <div>
      <h1>UseEffect_Ex1</h1>
      {/* this is the earlier version, when the route fetched the whole list.
          key is needed on every item in a list so React can track which row
          is which when the list changes. */}
      {/* <ul>
        {users.map((eachUser) => {
          const { id, name, email } = eachUser;
          return (
            <li key={id}>
              <div>{name}</div>
              <div>{email}</div>
            </li>
          );
        })} */}
      {/* </ul> */}
      <h1>{users.name}</h1>
      <h1>{users.email}</h1>
    </div>
  );
};

export default UseEffect_Ex1;
