import { Dispatch, SetStateAction } from "react";
import textEntry from "./textEntry";
import clearTerminal from "./clearTerminal";

export type imaginaitionCommandType = {
  currentCommand: string;
  setCurrentCommand: Dispatch<SetStateAction<string>>;
};

export default function terminalBehaviours(
  event: KeyboardEvent,
  commands: imaginaitionCommandType
) {
  textEntry(event, commands);
  clearTerminal(event, commands);
}
