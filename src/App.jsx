import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import DraggableWindow from './components/draggable-window/DraggableWindow'
import TopBar from './components/top-bar/TopBar'
import Loader from './components/loader/Loader';
import { useWebContainerContext } from './redux/WebContainerContext'

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
            <TopBar 
              codeEditorText={codeEditorText} 
            />
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
