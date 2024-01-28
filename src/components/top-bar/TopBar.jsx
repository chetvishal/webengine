import { useSelector, useDispatch } from 'react-redux';
import { initiallizeContainer } from '../../redux/features/webcontainerSlice';
import { WebContainer } from '@webcontainer/api';
import { useEffect ,useLayoutEffect,useRef } from 'react';


const TopBar = ({ codeEditorText }) => {

    const dispatch = useDispatch();
    const webcontainer = useSelector(state => state.webcontainer)
    
    return <div>
        <button onClick={async () => {
            console.log("webcontaienr", webcontainer.selectedFile)
            //  const res = await WebContainer.boot();
            dispatch(initiallizeContainer())
        }}>run boy run</button>
    </div>
}

export default TopBar;