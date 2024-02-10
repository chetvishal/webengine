import { useSelector, useDispatch } from 'react-redux';

const BrowserWindow = ({isWindowResizing}) => {

    const webcontainerState = useSelector(state => state.webcontainer);

    return(
        <div className="w-full h-full">
            <div className="h-full w-full" style={{visibility: isWindowResizing ? "hidden" : "visible"}}>

            </div>
            <iframe
                className={`h-full w-full absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ${isWindowResizing ? "-z-10" : ""}`}
                src={webcontainerState.url}
            ></iframe>
        </div> 
    )
}

export default BrowserWindow;