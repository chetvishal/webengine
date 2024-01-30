import { useSelector } from "react-redux";
import Folder from "./Folder";
import { useState } from "react";
import './styles.css'
import { addDependency } from "../../redux/features/webcontainerSlice";
import { useDispatch } from "react-redux";
import { useWebContainerContext } from "../../redux/WebContainerContext";
// import { files } from "../../constants";

const FileExplorer = () => {

    const [newPckgName, setNewPckgName] = useState('')
    const dispatch = useDispatch()

    const { webcontainerInstance } = useWebContainerContext()
    const files = useSelector(state => state.webcontainer.files)
    const packages = useSelector(state => state.webcontainer.packages)
    const isPackageInstalling = useSelector(state => state.webcontainer.loadingPckg)
    const handleAddNewPckg = (e) => {
      e.preventDefault()
      dispatch(addDependency({ wcInstance: webcontainerInstance, pckgName: newPckgName }))
      setNewPckgName('')
    }

    return (
      <>
        <Folder
          explorer={files}
          name={"file"}
          firstTime={true}
        />
        <form onSubmit={handleAddNewPckg}>
          <input onChange={e => setNewPckgName(e.target.value)} value={newPckgName} />
          <button type="submit" disabled={isPackageInstalling}>{isPackageInstalling ? "Installing..." : "submit"}</button>
        </form>
        {
          packages.map(pckg => (
            <p key={pckg.name}>{pckg.name}</p>
          ))
        }

      </>
    )

}

export default FileExplorer;