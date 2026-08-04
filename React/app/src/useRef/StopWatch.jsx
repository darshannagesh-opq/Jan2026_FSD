import React, { useState, useEffect, useRef } from "react";

/*
  NOTES: useRef use case 3, holding a timer id

  setInterval returns an id. You need that id later to call clearInterval and
  stop the timer.

  Where to keep the id:
    a normal variable   lost on the next render, so the timer can never be
                        stopped and it runs forever in the background
    useState            works, but setting it causes a pointless re render, and
                        the stop function might read an old value
    useRef              correct. It survives renders and changing it does not
                        re render anything. The id is not shown on screen, so
                        it does not belong in state.

  RULE: the number of seconds is shown on screen, so it is state. The timer id
  is internal bookkeeping, so it is a ref.

  THE GUARD IN START
  if (timerId.current !== null) return stops double intervals. Without it, two
  clicks on Start would create two intervals, the second id would overwrite the
  first, the first would become impossible to stop, and the counter would jump
  by two every second.

  WHY setSeconds USES prev
  setSeconds(prev => prev + 1) reads the latest value from React instead of the
  one captured when the interval was created. Writing setSeconds(seconds + 1)
  here would freeze at 1, because the callback given to setInterval keeps the
  seconds value from the render where it was created. This is called a stale
  closure.

  THE useEffect AT THE BOTTOM
  Empty dependency array with only a cleanup return. This effect does nothing
  on mount. Its whole job is the cleanup, which runs when the component
  unmounts. If the user navigates away while the watch is running, the interval
  would keep firing and try to set state on a component that is gone. Always
  clear timers and intervals on unmount.
*/
const StopWatch = () => {
  const [seconds, setSeconds] = useState(0);
  const timerId = useRef(null);

  const start =()=>{
    // guard: do not create a second interval if one is already running
    if (timerId.current !== null) return;
    timerId.current = setInterval(() => {
        // prev gives the latest value, avoids the stale closure
        setSeconds((prev) => prev+1)
    }, 1000);
  }

  const stop =() =>{
    clearInterval(timerId.current)
    // reset to null so the guard in start works again
    timerId.current = null
  }

  const reset = () =>{
    stop()
    setSeconds(0)
  }

  useEffect(()=>{
    // cleanup only, runs on unmount, stops a leaked interval
    return () => clearInterval(timerId.current)
  }, [])

  return <div>
    <h1>{seconds} s</h1>
    <button onClick={start}>Start</button>
    <button onClick={stop}>Stop</button>
    <button onClick={reset}>Reset</button>
  </div>;
};

export default StopWatch;
