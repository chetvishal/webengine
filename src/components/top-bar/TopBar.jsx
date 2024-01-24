import { useSelector, useDispatch } from 'react-redux';
import { initiallizeContainer } from '../../redux/features/webcontainerSlice';
import { WebContainer } from '@webcontainer/api';
import { useEffect ,useLayoutEffect,useRef } from 'react';
import { webcontainerInstance } from '../../constants';


const TopBar = ({ codeEditorText }) => {

    const dispatch = useDispatch();
    
    return <div>
        <button onClick={async () => {
            console.log("webcontainerInstance: ", webcontainerInstance)
            //  const res = await WebContainer.boot();
            dispatch(initiallizeContainer())
        }}>run</button>
    </div>
}

export default TopBar;