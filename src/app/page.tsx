"use client";

import { useEffect, useRef, useState } from "react";
import "./caret.css";

function Home() {
  const [text, setText] = useState("");
  const [caretOffset, setCaretOffset] = useState<number | undefined>(undefined);
  const commandInputTextRef = useRef<HTMLDivElement>(null);

  const widthMultiplierConstant = 9.6;

  function keyDownHandler(event: any) {
    const key: string = event.key;
    if (key.length == 1) {
      setCaretOffset(9.6 + (text.length + 1) * widthMultiplierConstant);
      setText(text + key.toLowerCase());
    }
    if (key === "Backspace") {
      if (text.length !== 0) {
        setCaretOffset(9.6 + (text.length - 1) * widthMultiplierConstant);
        setText(text.slice(0, -1));
      }
    }
  }

  return (
    <>
      <body className="bg-black w-screen h-screen" onKeyDown={keyDownHandler}>
        <div className="commandInputBox bg-neutral-900 bottom-0 absolute w-screen flex items-center h-12">
          <p
            className="text-white w-fit inline-block p-2 pr-0"
            ref={commandInputTextRef}
          >
            {text}
          </p>
          <div className="caret" style={{ left: caretOffset }} />
        </div>
      </body>
    </>
  );
}

export default Home;
