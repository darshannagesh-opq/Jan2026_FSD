import React from "react";

/*
  NOTES: React.memo

  React.memo wraps a component and tells React: if the props are the same as
  last time, do not run this component again, reuse the previous output.

  It is NOT a hook. It is a wrapper around the component, so it is written
  around the whole function, and it works on the props coming in.

  THE COMPARISON IS SHALLOW
  React checks each prop with ===. That is fine for strings, numbers and
  booleans. It fails for functions, objects and arrays created fresh in the
  parent, because a new reference is never === the old one. That is exactly why
  Parent.jsx wraps onAdd in useCallback.

  So React.memo alone is often useless. It only helps when the parent also
  keeps the prop references stable.

  THE CONSOLE LOG is the whole point of this file. Click Count in the parent
  and this log should stay silent. Click Add item and it renders, because that
  is a real interaction.

  Do not wrap every component in memo. It adds a comparison on every render, so
  for cheap components it costs more than it saves.
*/

const Child = React.memo(({ onAdd }) => {
  // if this prints when you click Count in Parent, the memo is not working
  console.log("Child rendered");
  return <button onClick={onAdd}>Add item</button>
});

export default Child;
