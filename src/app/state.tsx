import { createContext, useReducer } from "react"

export const CurrentImageContext = createContext(null)

function CurrentImageStateProvider() {
    const [currentImage, setCurrentImage] = useReducer()

    return (<>
        <CurrentImageContext.Provider value={}>

        </CurrentImageContext.Provider>
    </>);
}

export default CurrentImageStateProvider;