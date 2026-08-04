import React, { useState, useCallback, useLayoutEffect } from "react";
import Child from "./Child";

/*
  NOTES: React.memo plus useCallback, they must be used together

  THE PROBLEM
  When a parent re renders, all of its children re render too, even the ones
  whose props did not change. Here, clicking Count has nothing to do with
  Child, but Child would still re render.

  STEP 1: React.memo on the child, see Child.jsx. It tells React to skip the
  child if its props are the same as last time.

  STEP 2: useCallback on the function passed down. This is the part people
  forget, and without it step 1 does nothing.

  WHY
  React.memo compares props with ===. Functions and objects are compared by
  reference, not by content. A function created inside the component body is a
  brand new object on every render, so:

      const handleAdd = () => {...}     new reference every render
                                        old !== new
                                        React.memo always fails
                                        Child re renders anyway

  useCallback(fn, []) keeps the SAME function object between renders, so the
  comparison passes and Child is skipped.

  TEST IT
  Open the console and click Count. With useCallback, "Child rendered" does not
  appear. Remove the useCallback and it prints on every click, even though
  React.memo is still on the child.

  WHY THE DEPENDENCY ARRAY IS EMPTY
  Because the function does not read any prop or state from the render it was
  created in. It uses setItems(prev => ...), the updater form, which asks React
  for the latest value instead of capturing items from the closure.

  If it were written as setItems([...items, "new"]) then items would have to be
  in the dependency array, the function would be recreated whenever items
  changed, and the memo benefit would mostly disappear. The updater form is
  what keeps the array empty.

  WHEN NOT TO BOTHER
  Only do this for children that are actually expensive or that render very
  often. For a small button like this it is a teaching example, not something
  worth doing in real code. Note also that the React Compiler, which is turned
  off in vite.config.js for these demos, would handle all of this on its own.

  UNUSED IMPORT: useLayoutEffect is imported but not used. Remove it or add a
  small demo. useLayoutEffect is the same as useEffect but runs before the
  browser paints, so it is used to measure or fix layout without a visible
  flicker.
*/

const Parent = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([])

  // stable reference, so React.memo on Child can actually skip the re render
  const handleAdd = useCallback(() => {
    // updater form: prev is the latest list, so items is not a dependency
    setItems((prev) => [...prev, `Item ${prev.length + 1}`])
  }, [])
  return (
    <>
      {/* clicking this re renders Parent but should NOT re render Child */}
      <button onClick={() => setCount(count + 1)}>
        Count:{count}</button>
        <Child onAdd={handleAdd}/>
        <ul>
            {/* key must be stable and unique. Item text works here because the
                values never repeat. Avoid using the array index as a key when
                the list can be reordered or items removed. */}
            {items.map((it)=>(
                <li key={it}>{it}</li>
            ))}
        </ul>
    </>
  );
};

export default Parent;
