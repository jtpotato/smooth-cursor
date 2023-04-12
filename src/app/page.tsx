'use client'

import { useEffect, useRef, useState } from "react";
import "./caret.css";

function Home() {
  const [text, setText] = useState("So this is great.")
  const [caretOffset, setCaretOffset] = useState(0);
  const commandInputTextRef = useRef<HTMLDivElement>(null);

  function determineCaretOffset() {
    setCaretOffset(commandInputTextRef.current!.clientWidth)
  }

  useEffect(() => {
    determineCaretOffset()
  }, [])
  
  function keyDownHandler(event) {
    // if (event.getKey())
  }

  return (
    <>
      <body className="bg-black w-screen h-screen">
        <div className="commandInputBox bg-neutral-900 bottom-0 absolute w-screen flex items-center p-2" onKeyDown={keyDownHandler}>
          <p className="text-white w-fit inline-block" ref={commandInputTextRef}>
          {text}
          </p>
          <div className="caret" style={{ left: caretOffset }}/>
        </div>
      </body>
    </>
  );
}

export default Home;
