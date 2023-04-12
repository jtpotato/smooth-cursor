"use client";

import { useEffect, useRef, useState } from "react";
import "./caret.css";
import terminalBehaviours from "./terminalBehaviours";

function Home() {
  const [commandHistory, setCommandHistory] = useState<string[]>([""]);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState<number>(0);
  const [caretXOffset, setCaretXOffset] = useState<number | undefined>(undefined);
  const [caretYOffset, setCaretYOffset] = useState<number | undefined>(undefined);
  const commandInputTextRef = useRef<HTMLDivElement>(null);
  const commandInputBoxRef = useRef<HTMLDivElement>(null);
  const caretTargetRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);

  // calculate caret offsets
  useEffect(() => {
    let offsetTop = caretTargetRef.current!.offsetTop
    let offsetLeft = caretTargetRef.current!.offsetLeft

    // other weird edge case
    if (commandHistory[commandHistoryIndex].endsWith(" ")) {
      offsetLeft = offsetLeft + 10
    }

    // weird edge case
    if (offsetLeft == 8) {
      offsetTop =  (commandInputBoxRef.current!.offsetHeight/2) - (caretRef.current!.offsetHeight/2)
      console.log(commandInputBoxRef.current!.clientHeight, caretRef.current!.offsetHeight)
      console.log(offsetTop)
    }

    setCaretYOffset(offsetTop);
    setCaretXOffset(offsetLeft);
  }, [commandHistory, commandHistoryIndex])

  function keyDownHandler(e: any) { // stupid react hacks
    const event: KeyboardEvent = e
    const key: string = event.key;
    if (key.length == 1) {
      if (commandHistoryIndex !== commandHistory.length - 1) {
        setCommandHistory([...commandHistory, commandHistory[commandHistoryIndex] + key.toLowerCase()])
        setCommandHistoryIndex(commandHistory.length)
      } else {
        setCommandHistory([...commandHistory.slice(0, -1), commandHistory[commandHistoryIndex] + key.toLowerCase()])
      }
    }
    if (key === "Backspace") {
      if (commandHistory[commandHistoryIndex].length !== 0) {
        if (commandHistoryIndex !== commandHistory.length - 1) {
          setCommandHistory([...commandHistory, commandHistory[commandHistoryIndex].slice(0, -1)])
          setCommandHistoryIndex(commandHistory.length)
        }
        else {
          setCommandHistory([...commandHistory.slice(0, -1), commandHistory[commandHistoryIndex].slice(0, -1)]);
        }
      }
    }
    const commands = { commandHistoryIndex, setCommandHistoryIndex, commandHistory, setCommandHistory }
    terminalBehaviours(event, commands)
  }

  return (
    <>
      <body className="bg-black w-screen h-screen" onKeyDown={keyDownHandler}>
        <div ref={commandInputBoxRef} className="bg-neutral-900 bottom-0 absolute w-screen flex items-center p-2">
          <p
            className="text-white inline-block p-2 pr-0 max-w-full"
            ref={commandInputTextRef}
          >
            {commandHistory[commandHistoryIndex]}
            <span ref={caretTargetRef} className="" />
          </p>
          <div ref={caretRef} className="caret" style={{ left: caretXOffset, top: caretYOffset }} />
        </div>
      </body>
    </>
  );
}

export default Home;
