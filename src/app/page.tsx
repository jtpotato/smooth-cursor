"use client";

import { useEffect, useRef, useState } from "react";
import "./caret.css";
import terminalBehaviours from "./terminal/terminalBehaviours";

function Home() {
  const [currentCommand, setCurrentCommand] = useState<string>("");
  const [caretXOffset, setCaretXOffset] = useState<number | undefined>(
    undefined
  );
  const [caretYOffset, setCaretYOffset] = useState<number | undefined>(
    undefined
  );
  const commandInputTextRef = useRef<HTMLDivElement>(null);
  const commandInputBoxRef = useRef<HTMLDivElement>(null);
  const caretTargetRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);

  // calculate caret offsets
  useEffect(() => {
    let offsetTop = caretTargetRef.current!.offsetTop;
    let offsetLeft = caretTargetRef.current!.offsetLeft;

    if (currentCommand.endsWith(" ")) {
      offsetLeft += 10;
    }

    setCaretYOffset(offsetTop);
    setCaretXOffset(offsetLeft);
  }, [currentCommand]);

  function keyDownHandler(e: any) {
    // stupid react hacks
    const event: KeyboardEvent = e;
    const commands = {
      currentCommand,
      setCurrentCommand
    };
    terminalBehaviours(event, commands);
  }

  return (
    <>
      <body className="bg-black w-screen h-screen" onKeyDown={keyDownHandler}>
        <div
          ref={commandInputBoxRef}
          style={{
            bottom: 0,
            position: "absolute",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            height: "100vh"
          }}
        >
          <p
            style={{
              color: "white",
              display: "inline-block",
              padding: "0.5rem",
              paddingRight: 0,
              width: "100%",
              overflowWrap: "break-word",
            }}
            ref={commandInputTextRef}
          >
            {currentCommand}
            <span ref={caretTargetRef} className="" />
          </p>
          <div
            ref={caretRef}
            className="caret"
            style={{ left: caretXOffset, top: caretYOffset }}
          />
        </div>
      </body>
    </>
  );
}

export default Home;
