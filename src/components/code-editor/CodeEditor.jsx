import Editor from "@monaco-editor/react";
import { useState, useCallback, useMemo } from "react";
import styles from './CodeEditor.module.css'
import { useSelector } from "react-redux";
import { useWebContainerContext } from "../../redux/WebContainerContext";

const CodeEditor = (
    { setCodeEditorText }
    ) => {

    const [value, setValue] = useState("");
    const { webcontainerInstance } = useWebContainerContext()

    const handleEditorChange = async (value) => {
        setValue(value);
        setCodeEditorText(value)

        await webcontainerInstance.current.fs.writeFile(`/${webcontainerState.selectedFile.path}`, value);
        // onChange("code", value);
    };

    // const selectFile = useCallback((webc) => {
    //     const fileSelected = webc.selectedFile.path;
    //     const path = fileSelected.split('/');
    //     // const findFile = p => {
    //     //     if(p)
    //     // }
    //     return webc.files.
    // }, []);

    const webcontainerState = useSelector(state => state.webcontainer)
    const selectedFile = useMemo(async () => {
        if(webcontainerState.selectedFile.path === '') {
            return ''
        }
        const val = await webcontainerInstance.current.fs.readFile(`/${webcontainerState.selectedFile.path}`, 'utf-8');
        console.log("val: ", val)
        setValue(val)
    }, [webcontainerState.selectedFile.path])
    
    // const selectedFile = useSelector(state => )

    return <div className={styles.codeEditorContainer}>
        <h3 onClick={() => console.log("webcontainerState: ", webcontainerState)}>click me</h3>
        <Editor
            height="85vh"
            width={`100vw`}
            defaultValue="// some comment"
            // language={language || "javascript"}
            value={value}
            // theme={theme}
            onChange={handleEditorChange}
            options={{
                minimap: {
                  enabled: false,
                },
                scrollBeyondLastLine: false,
                renderLineHighlight: "none"
            }}
        />
    </div>
}

export default CodeEditor;