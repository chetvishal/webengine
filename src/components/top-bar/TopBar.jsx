import { useSelector, useDispatch } from 'react-redux';
import { initiallizeContainer } from '../../redux/features/webcontainerSlice';
import { WebContainer } from '@webcontainer/api';
import { useEffect ,useLayoutEffect,useRef } from 'react';
import { useWebContainerContext } from '../../redux/WebContainerContext';


const TopBar = ({ codeEditorText }) => {

    const dispatch = useDispatch();
    const webcontainer = useSelector(state => state.webcontainer)
    const { webcontainerInstance } = useWebContainerContext()
    
    return <div>
        <button onClick={async () => {
            console.log("webcontaienr", webcontainer.selectedFile)
            console.log("files: ", webcontainer)
            //  const res = await WebContainer.boot();
            const seee = await webcontainerInstance.current.fs.readdir('/src');
            console.log("seee: ", seee)
            dispatch(initiallizeContainer())
        }}>run boy run</button>
    </div>
}

export default TopBar;