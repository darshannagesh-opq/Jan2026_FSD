import React, { useState, useEffect, useRef } from "react";

/*
  NOTES: useRef use case 2, a value that survives renders without causing one

  THE KEY DIFFERENCE

    useState   changing it triggers a re render, and the new value is visible
               in the next render
    useRef     changing .current does NOT trigger a re render, and the value
               survives across renders

  A normal variable will not work either. let count = 0 inside the component
  would reset to 0 on every render, because the whole function body runs again.

  WHY NOT useState HERE
  See the commented line. If renderCount were state, then counting a render
  would set state, setting state would cause a render, that render would count
  again, and so on forever. That is the infinite loop written in the comment
  below. A ref breaks the loop because writing to it changes nothing on screen.

  WHY THE UPDATE IS IN useEffect
  Never mutate a ref during render. The render must stay pure. The effect runs
  after the render is done, which is the safe place to record that it happened.
  There is no dependency array, so it counts every render.

  ONE CATCH
  Since changing a ref does not re render, the number you see on screen is one
  render behind. It only refreshes because typing also updates state and causes
  a new render anyway. A ref is not for values you want to display live.

  RULE OF THUMB
  If the screen must change when the value changes, use state.
  If you only need to remember something between renders, use a ref.
*/
const RenderCounter = () => {
  const [text, setText] = useState("");
  // const [renderCount, setRenderCount] = useState("");
  const renderCount = useRef(1)
//   render -> state -> re-render ->sets state -> forever
  useEffect(()=>{
    // safe to mutate here, after render, and it causes no re render
    renderCount.current = renderCount.current + 1
  })
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <h3>Typing: {text}</h3>
      <h3>Component Rendered {renderCount.current} times</h3>
    </div>
  );
};

export default RenderCounter;
