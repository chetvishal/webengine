import { useSelector } from "react-redux";
import Folder from "./Folder";
import { useState } from "react";
import './styles.css'
import { addDependency } from "../../redux/features/webcontainerSlice";
import { useDispatch } from "react-redux";
import { useWebContainerContext } from "../../redux/WebContainerContext";
// import { files } from "../../constants";
import downArrow from '../../assets/downArrow.svg'
import moreThan from '../../assets/moreThan.svg'

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
    const [expand, setExpand] = useState({
      expandFolder: true,
      expandDependencyList: false
    })

    return (
      <div>
        <div className="flex cursor-pointer p-1 justify-start mt-1" onClick={(e) => {
          // e.stopPropagation()
          setExpand((a) => ({
            ...a,
            expandFolder: !a.expandFolder
          }))
        }
        }
        >
          <div className="flex items-center">
            {
              expand.expandFolder ?
                <img src={downArrow} className="w-4" /> :
                <img src={moreThan} className="w-4" />
            }
            <span>Files</span>
          </div>
        </div>
        <div className="pl-3">
          {
            expand.expandFolder && <Folder
              explorer={files}
              name={"file"}
              firstTime={true}
            />
          }
        </div>

        <div className="flex cursor-pointer p-1 justify-start mt-1" onClick={(e) => {
          setExpand((a) => ({
            ...a,
            expandDependencyList: !a.expandDependencyList
          }))
        }
        }
        >
          <div className="flex items-center">
            {
              expand.expandDependencyList ?
                <img src={downArrow} className="w-4" /> :
                <img src={moreThan} className="w-4" />
            }
            <span>Dependencies</span>
          </div>
        </div>
        {
          expand.expandDependencyList && <>
            {
              packages.map(pckg => (
                <p key={pckg.name} className="pl-4">{pckg.name}</p>
              ))
            }
            <form onSubmit={handleAddNewPckg} className="px-4 mt-2">
              <input onChange={e => setNewPckgName(e.target.value)} value={newPckgName} placeholder="Enter package name..." className="w-full border-black border-solid border-2" />
              {isPackageInstalling ? "Installing..." : ""}
            </form>
          </>
        }
      </div>
    )

}

export default FileExplorer;