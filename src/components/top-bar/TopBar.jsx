import { useSelector, useDispatch } from 'react-redux';
import { initiallizeContainer } from '../../redux/features/webcontainerSlice';
import { WebContainer } from '@webcontainer/api';
import { useEffect ,useLayoutEffect,useRef } from 'react';
import { useWebContainerContext } from '../../redux/WebContainerContext';


const TopBar = () => {

    return <div className='h-[3%]'>
        <button>Webengine</button>
    </div>
}

export default TopBar;