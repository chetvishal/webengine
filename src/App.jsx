import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import CodeEditor from './components/code-editor/CodeEditor'
import Terminal from './components/terminal/Terminal'
import Slider from './components/slider/Slider'
import './App.css'
import styles from './App.module.css'
import DraggableWindow from './components/draggable-window/DraggableWindow'
import TopBar from './components/top-bar/TopBar'
import { WebContainer } from '@webcontainer/api';
import { webcontainerInstance } from './constants'
import { files } from './constants'
import { useSelector, useDispatch } from 'react-redux';
import { setUrl } from './redux/features/webcontainerSlice'
import Loader from './components/loader/Loader'



// const res = await WebContainer.boot();



function App() {

  const [count, setCount] = useState(0)
  const [codeEditorText, setCodeEditorText] = useState("")
  const [outputContent, setOutputContent] = useState("")
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const installDependencies = useCallback(async function () {
    // Install dependencies
    const installProcess = await webcontainerInstance.spawn('npm', ['install']);
    // Wait for install command to exit

    // installProcess.output.pipeTo(new WritableStream({
    //   write(data) {
    //     console.log(data)
    //   }
    // }));
    return installProcess.exit;
  })

  useEffect(() => {
    (async () => {
      await webcontainerInstance.mount(files);

      webcontainerInstance.on('server-ready', (port, url) => {
        // iframeEl.src = url;
        dispatch(setUrl(url))
        setLoading(false)
      });

      const exitCode = await installDependencies()
      if (exitCode !== 0) {
        throw new Error('Installation failed');
      };
      await webcontainerInstance.spawn('npm', ['run', 'start']);

    })()
  }, []);

  return (
    <div id="app">
      {
        !loading
          ?
          <>
            <TopBar codeEditorText={codeEditorText} />
            <DraggableWindow
              setCodeEditorText={setCodeEditorText}
              outputContent={outputContent}
            />
          </> :
          <Loader />

      }
    </div>
  )
}

export default App
