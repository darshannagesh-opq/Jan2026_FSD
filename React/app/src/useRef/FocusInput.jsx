import React, {useRef} from 'react'

/*
  NOTES: useRef use case 1, reaching a DOM element

  useRef(null) creates a box with one property, .current. Put the ref on a JSX
  element with the ref attribute and React fills .current with the real DOM
  node after the element is on screen.

  From there you can call normal browser methods: focus, blur, scrollIntoView,
  play, pause, select, and so on.

  Why not document.getElementById: it searches the whole page and it breaks if
  the same component is rendered twice, because both copies would share the id.
  A ref points to this component's own element only.

  Timing: inputRef.current is null during the very first render, because the
  element does not exist yet. It is safe here since we only read it inside a
  click handler, which can only run after the element is on screen. If you need
  it right after mount, read it inside a useEffect, not in the body.
*/
const FocusInput = () => {
    const inputRef = useRef(null)
    const handleFocus = () =>{
        // .current is the real input element in the browser
        inputRef.current.focus()
    }
  return (
    <div>
        {/* ref connects this element to inputRef */}
        <input ref={inputRef} type='text' placeholder='Click the button'/>
        <button onClick={handleFocus}>Button</button>
    </div>
  )
}

export default FocusInput
