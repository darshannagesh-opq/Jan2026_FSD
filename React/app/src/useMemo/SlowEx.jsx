import React, { useState, useMemo } from "react";

/*
  NOTES: useMemo

  Every time state changes, the whole component function runs again. That means
  every calculation inside it runs again too, even the ones whose inputs did
  not change.

  useMemo caches the RESULT of a calculation and only runs it again when a
  value in the dependency array changes.

      const value = useMemo(() => expensiveWork(x), [x])

  THE DEMO
  slowDouble blocks the browser for a full second on purpose, to make the
  problem visible. Two pieces of state exist here, number and dark. Only the
  calculation depends on number.

  Try it with useMemo in place:
      change the number   the calculation runs, you wait 1 second, correct
      toggle the theme    instant, because [number] did not change

  Now remove the useMemo and call slowDouble(number) directly. Toggling the
  theme freezes for a second every single time, for a result that was already
  known. Watch the "SLOW CALC ran at" log to see the difference.

  WHEN TO USE IT
  Only for genuinely heavy work, or when the value is a prop passed to a
  React.memo child and must keep the same identity. useMemo is not free, it
  costs memory and a comparison on every render. Do not wrap simple maths or
  short string work in it.

  useMemo VS useCallback
      useMemo      remembers a VALUE, the thing your function returned
      useCallback  remembers the FUNCTION itself
      useCallback(fn, deps) is the same as useMemo(() => fn, deps)
  See ReactMemo/Parent.jsx for the useCallback side.

  NOTE ON theme
  The theme object below is rebuilt on every render and is deliberately not
  memoized. That is correct, because building a small object is cheap and it is
  only used inline here. It would matter only if it were passed to a memoized
  child.
*/

const slowDouble = (num) => {
  console.log("SLOW CALC ran at", Date.now());
  // fake heavy work, blocks the browser for one second
  const start = Date.now();
  while (Date.now() - start < 1000) {}
  return num * 2;
};

const SlowEx = () => {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);
  // recalculates only when number changes, not when dark changes
  const doubled = useMemo(()=>slowDouble(number), [number]);
  console.log("Toggle State: ", dark);
  const theme = {
    backgroundColor: dark ? "#0b0b0c" : "#FFFFFF",
    color: dark ? "#FFFFFF" : "#0b0b0c",
    padding: "1rem",
  };
  return (
    <div style={theme}>
      <input
        type="number"
        value={number}
        // input values are strings, so convert before storing
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      {/* this re renders the component but must NOT rerun the slow calc */}
      <button onClick={() => setDark(!dark)}>Toggle theme</button>
      <h2>Doubled: {doubled}</h2>
    </div>
  );
};

export default SlowEx;
