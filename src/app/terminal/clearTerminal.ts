import { imaginaitionCommandType } from "./terminalBehaviours";

export default function clearTerminal(event: KeyboardEvent, commands: imaginaitionCommandType) {
    if (event.key === "ArrowDown") {
        commands.setCurrentCommand("")
    }
}