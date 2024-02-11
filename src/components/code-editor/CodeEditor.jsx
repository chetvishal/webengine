import Editor from "@monaco-editor/react";
import { useState, useRef, useEffect, useMemo } from "react";
import styles from './CodeEditor.module.css'
import { useSelector } from "react-redux";
import { useWebContainerContext } from "../../redux/WebContainerContext";

const fileByExtension = {
    "js": "javascript",
    'css': 'css',
    'json': 'json',
    'html': 'html',
    'jsx': "javascript"
}

const CodeEditor = (
    { setCodeEditorText }
    ) => {

    const [value, setValue] = useState("");
    const { webcontainerInstance } = useWebContainerContext()
    const userTyping = useRef(false)

    const handleEditorChange = async (value) => {
        setValue(value);
        setCodeEditorText(value)
        userTyping.current = true;
        await webcontainerInstance.current.fs.writeFile(`/${webcontainerState.selectedFile.path}`, value);
        userTyping.current = false;
    };

    const webcontainerState = useSelector(state => state.webcontainer)
    const fileExtension = useMemo(() => webcontainerState.selectedFile.path.match(/\.([^.]+)$/)[1], [webcontainerState])

    useEffect(() => {

        var watchingPackageJson;
        (async () => {

            if (webcontainerState.selectedFile.path === '') {
                return ''
            }
            const val = await webcontainerInstance.current.fs.readFile(`/${webcontainerState.selectedFile.path}`, 'utf-8');
            if (`/${webcontainerState.selectedFile.path}` === '/package.json') {
                watchingPackageJson = webcontainerInstance.current.fs.watch(`/${webcontainerState.selectedFile.path}`, { encoding: 'utf-8' }, async (event, fileName) => {
                    if (!userTyping.current && event === 'change') {
                        const val = await webcontainerInstance.current.fs.readFile(`/${webcontainerState.selectedFile.path}`, 'utf-8');
                        setValue(val)
                    }
                })
            }
            setValue(val)

        }

        )()

        return () => {
            if(watchingPackageJson)
                watchingPackageJson.close()
        }

    }, [webcontainerState.selectedFile.path])

    function handleEditorDidMount(editor, monaco) {

        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
        });
    }

    return <div className={styles.codeEditorContainer}>
        <Editor
            height="100%"
            width={`100%`}
            defaultValue="// hello world"
            value={value}
            // theme={theme}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            language={fileByExtension[fileExtension] || 'text'}
            options={{
                minimap: {
                  enabled: false,
                },
                scrollBeyondLastLine: false,
                renderLineHighlight: "none",
                wordWrap: "on",
                colorDecorators: true
            }}                                                                                                                                                                   
        />
    </div>
}

export default CodeEditor;