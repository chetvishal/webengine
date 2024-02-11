import { useSelector, useDispatch } from 'react-redux';
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { useCallback, useRef } from 'react';

const BrowserWindow = ({ isWindowResizing }) => {

    const webcontainerState = useSelector(state => state.webcontainer);
    const browserRef = useRef()

    const handleRefreshBtn = useCallback(() => {
        browserRef.current.src = browserRef.current.src
    }, []);

    return (
        <div className="w-full h-full">
            <div className='w-full h-7 flex items-center bg-white'>
                <ArrowPathIcon 
                    className='w-5 text-black mx-2 cursor-pointer'
                    onClick={handleRefreshBtn}
                />
                <input 
                    className='w-[95%] h-[80%] rounded-2xl p-1 mr-2 border-slate-300 border text-xs '
                    type="text"
                    readOnly
                    defaultValue={webcontainerState.url}
                />
            </div>
            <div className="w-full h-full relative">
                <div className="h-full w-full" style={{ visibility: isWindowResizing ? "hidden" : "visible" }}>

                </div>
                <iframe
                    className={`h-full w-full absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ${isWindowResizing ? "-z-10" : ""}`}
                    src={webcontainerState.url}
                    ref={browserRef}
                ></iframe>
            </div>
        </div>
    )
}

export default BrowserWindow;