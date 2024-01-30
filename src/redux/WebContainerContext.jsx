import { useEffect, useCallback, useRef, useContext, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WebContainer } from '@webcontainer/api';
import { setUrl, selectFile } from "./features/webcontainerSlice";

const webcontainerContext = createContext();
export const useWebContainerContext = () => useContext(webcontainerContext);

export const WebContainerContextProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const webcontainer = useSelector(state => state.webcontainer)
    const webcontainerInstance = useRef()

    const installDependencies = useCallback(async function () {
        // Install dependencies
        const installProcess = await webcontainerInstance.current.spawn('npm', ['install']);
        // installProcess.output.pipeTo(new WritableStream({
        //     write(data) {
        //         console.log(data)
        //     }
        // }));
        return installProcess.exit;
    }, [])

    useEffect(() => {
        (async () => {
            if (!webcontainerInstance.current)
                webcontainerInstance.current = await WebContainer.boot()
            await webcontainerInstance.current.mount(webcontainer.files);

            webcontainerInstance.current.on('server-ready', (port, url) => {
                dispatch(setUrl(url))
                dispatch(selectFile('/src/App.js'))
                setLoading(false)
            });

            const exitCode = await installDependencies()
            if (exitCode !== 0) {
                throw new Error('Installation failed');
            };
            await webcontainerInstance.current.spawn('npm', ['run', 'start']);

        })()
    }, []);


    return (
        <webcontainerContext.Provider value={{ webcontainerInstance, loading }}>
            {children}
        </webcontainerContext.Provider>
    )
}

export default WebContainerContextProvider;