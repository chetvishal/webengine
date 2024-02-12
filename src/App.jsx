import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import DraggableWindow from './components/draggable-window/DraggableWindow'
import TopBar from './components/top-bar/TopBar'
import Loader from './components/loader/Loader';
import { useWebContainerContext } from './redux/WebContainerContext'

const initialLayout = {
  direction: 'row',
  first: {
      direction: 'row',
      first: 'Files',
      second: 'Editor',
      splitPercentage: "30"
  },
  second: 'Preview',
  splitPercentage: "60"
}

function App() {

  const [codeEditorText, setCodeEditorText] = useState("")
  const [outputContent, setOutputContent] = useState("")
  const webcContext = useWebContainerContext()
  const [layout, setLayout] = useState(initialLayout)

  const resetLayout = useCallback(() => {
    setLayout(initialLayout)
  }, []);

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
              resetLayout={resetLayout}
            />
            <DraggableWindow
              setCodeEditorText={setCodeEditorText}
              outputContent={outputContent}
              layout={layout}
              setLayout={setLayout}
            />
          </>
      }
    </div>
  )
}

export default App
