import Editor from "@monaco-editor/react";
import { useState } from "react";
import styles from './CodeEditor.module.css'

const CodeEditor = (
    { setCodeEditorText }
    ) => {

    const [value, setValue] = useState("");

    const handleEditorChange = (value) => {
        console.log("vlaue: ", typeof value)
        setValue(value);
        setCodeEditorText(value)
        // onChange("code", value);
    };

    return <div className={styles.codeEditorContainer}>
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