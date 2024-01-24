
import { useLayoutEffect } from "react";
import { webcontainerInstance } from "../../constants";
import { files } from "../../constants";
import { useSelector, useDispatch } from 'react-redux';


const BrowserWindow = ({url = ""}) => {

    const webcontainerState = useSelector(state => state.webcontainer);

    return(
        <div>
            <iframe src={webcontainerState.url}></iframe>
        </div>
    )
}

export default BrowserWindow;