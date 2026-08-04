import React, { useEffect, useState } from "react";

/*
  NOTES: useEffect basics

  useEffect is for side effects. A side effect is anything that reaches outside
  React: fetching data, timers, event listeners, changing the document title,
  writing to localStorage.

  Do not put side effects directly in the component body. The body runs during
  render and must stay pure. useEffect runs after the render is painted.

  Shape:
      useEffect(() => {
        // effect code
        return () => { ...cleanup code... }
      }, [dependencies])

  THE DEPENDENCY ARRAY decides how often the effect runs:

    no array      runs after every single render. This file uses this on
                  purpose, so you can see it fire on every click of Inc and
                  every toggle.
    []            runs only once after the first render. Use for setup that
                  should happen one time.
    [count]       runs after the first render, and again only when count
                  changes between renders.

  THE CLEANUP FUNCTION is the function you return. React calls it before the
  effect runs again, and once more when the component unmounts.

  Watch the console here. Because there is no dependency array, every click
  prints "Removing...." first and then "Hello from UseEffect". The old listener
  is removed and a fresh one is added each time.

  Why cleanup matters: without removeEventListener, every render would add
  another resize listener and none would ever be removed. That is a memory leak
  and the handler would run many times for one resize.

  Note on the initial state: window.innerWidth is read directly as the starting
  value. That is fine because it is only read once at mount.

  Better version for real code: add [] as the dependency array so the listener
  is attached once and removed on unmount, instead of on every render.
*/
const UseEffect_basics = () => {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  useEffect(() => {
    const resizeHandler = () => {
      setPageWidth(window.innerWidth);
    };

    // subscribe to the browser event
    window.addEventListener("resize", resizeHandler);
    console.log("Hello from UseEffect");

    // cleanup: unsubscribe so listeners do not pile up
    return () => {
      console.log("Removing....");
      window.removeEventListener("resize", resizeHandler);
    };

    // no dependency array, so this runs after every render
  });
  return (
    <div>
      <h2>UseEffect_basics</h2>
      <h2 onClick={() => setToggle(!toggle)}>{toggle ? "open" : "close"}</h2>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}> Inc+ </button>
      {/* resize the browser window and watch this number change */}
      <h2>{pageWidth}</h2>
    </div>
  );
};

export default UseEffect_basics;
