import { Dispatch, SetStateAction } from "react";

export default function terminalBehaviours(event: KeyboardEvent, commands: { commandHistoryIndex: number, setCommandHistoryIndex: Dispatch<SetStateAction<number>>, commandHistory: string[], setCommandHistory: Dispatch<SetStateAction<string[]>> }) {
    if (event.key === "ArrowDown") {
    }
}