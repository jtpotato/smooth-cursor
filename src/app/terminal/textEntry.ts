import { imaginaitionCommandType } from "./terminalBehaviours";

export default function textEntry(event: KeyboardEvent, commands: imaginaitionCommandType) {
    const key: string = event.key;
    if (key.length == 1) {
        commands.setCurrentCommand(commands.currentCommand + key.toLowerCase());
    }
    if (key === "Backspace") {
        commands.setCurrentCommand(commands.currentCommand.slice(0, -1));
    }
}