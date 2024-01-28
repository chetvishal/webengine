import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import CodeEditor from './components/code-editor/CodeEditor'
import Terminal from './components/terminal/Terminal'
import Slider from './components/slider/Slider'
import './App.css'
import styles from './App.module.css'
import DraggableWindow from './components/draggable-window/DraggableWindow'
import TopBar from './components/top-bar/TopBar'
// import { webcontainerInstance } from './constants'
import { files } from './constants'
import { useSelector, useDispatch } from 'react-redux';
import { setUrl } from './redux/features/webcontainerSlice'
import Loader from './components/loader/Loader'
// import { WebContainer } from '@webcontainer/api';
import { useWebContainerContext } from './redux/WebContainerContext'



// const res = await WebContainer.boot();



function App() {

  const [codeEditorText, setCodeEditorText] = useState("")
  const [outputContent, setOutputContent] = useState("")
  const webcContext = useWebContainerContext()
  

  

  

  return (
    <div id="app">
      {
        webcContext.loading
          ?
          <Loader />
          :
          <>
            <TopBar codeEditorText={codeEditorText} />
            <DraggableWindow
              setCodeEditorText={setCodeEditorText}
              outputContent={outputContent}
            />
          </>
      }
    </div>
  )
}

export default App
