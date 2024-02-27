import { WebContainer } from '@webcontainer/api';
import { buildCreateSlice, asyncThunkCreator, current } from '@reduxjs/toolkit'
import { files } from "../../constants";
import cloneDeep from "lodash/cloneDeep";

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

function renameFileOrFolderByPath(obj, path, newName) {
  const keys = path.split('/');
  let newObj = cloneDeep(obj);
  let currentObj = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!currentObj[key] || !currentObj[key].directory) {
      // Directory not found
      return newObj; // Return the original object
    }
    currentObj = currentObj[key].directory;
  }

  const oldName = keys[keys.length - 1];
  if (currentObj[oldName]) {
    // If the file or folder exists, rename it
    currentObj[newName] = currentObj[oldName];
    delete currentObj[oldName];
  }

  return newObj;
}

function deleteFileOrFolderByPath(obj, path) {
  const keys = path.split('/');
  let newObj = cloneDeep(obj);
  let currentObj = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!currentObj[key] || !currentObj[key].directory) {
      // Directory not found
      return newObj; // Return the original object
    }
    currentObj = currentObj[key].directory;
  }

  const fileName = keys[keys.length - 1];
  if (currentObj[fileName]) {
    // If the file or folder exists, delete it
    delete currentObj[fileName];
  }

  return newObj;
}

function addFileByPath(obj, path, contents, directory = false) {
  const keys = path.split('/');
  let newObj = cloneDeep(obj)
  let currentObj = newObj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    currentObj = currentObj[key].directory || (currentObj[key].directory = {});
  }

  const fileName = keys[keys.length - 1];
  if (directory) {
    currentObj[fileName] = {
      directory: {}
    };
  }
  else
    currentObj[fileName] = {
      file: {
        contents
      }
    };
  return newObj;
}

function installDependency(wcInstance, pckgName) {

  return new Promise(async (resolve, reject) => {
    try {

      const serverProcess = await wcInstance.current.spawn('npm', ['install', pckgName]);
      const exitCode = await serverProcess.exit;
      if(exitCode === 0)
        resolve(`Successfully install ${pckgName}`)
      else 
        reject(`Failed to install ${pckgName}`)

    }
    catch(err) {
      reject(`Failed to install ${pckgName}`)
    }
  })
}

export const webcontainerSlice = createAppSlice({
  name: 'webcontainer',
  initialState: {
    webcontainerInstance: '',
    url: '',
    files: files,
    loading: true,
    selectedFile: {
      path: ''
    },
    packages: [
      {
        name: "react"
      },
      {
        name: "react-dom"
      },
    ],
    loadingPckg: false
  },
  reducers: (create) => ({

    setUrl: create.reducer((state, action) => {
      state.url = action.payload;
    }),

    initiallizeContainer: create.asyncThunk(
      async (action, payload) => {
        // console.log("check this :", action, payload)
        const res = await WebContainer.boot();
        return res
      },
      {
        pending: (state) => {
          state.loading = true
        },
        rejected: (state, action) => {
          state.loading = false
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.webcontainerInstance = action.payload;
        },
      }
    ),

    selectFile: create.reducer((state, action) => {
      state.selectedFile.path = action.payload;
    }),

    addFile: create.asyncThunk(
      async ({ path, wcInstance, fileName }) => {
        await wcInstance.current.fs.writeFile(path, '');
        return { path, fileName }
      },
      {
        pending: (state, action) => {
        },
        rejected: (state, action) => {
        },
        fulfilled: (state, action) => {
          state.files = addFileByPath(current(state.files), action.payload.path, '')
        }
      }
    ),

    addFolder: create.asyncThunk(
      async ({ path, wcInstance, fileName }) => {
        await wcInstance.current.fs.mkdir(path);
        return { path, fileName }
      },
      {
        pending: (state, action) => {
        },
        rejected: (state, action) => {
        },
        fulfilled: (state, action) => {
          state.files = addFileByPath(current(state.files), action.payload.path, '', true)
        }
      }
    ),

    addDependency: create.asyncThunk(
      async ({ wcInstance, pckgName }) => {
        await installDependency(wcInstance, pckgName)
        return { pckgName }
      },
      {
        pending: (state, action) => {
          state.loadingPckg = true;
        },
        rejected: (state, action) => {
          state.loadingPckg = false;
          alert(action.error.message)
        },
        fulfilled: (state, action) => {
          state.loadingPckg = false;
          state.packages = [...state.packages, { name: action.payload.pckgName }]
          // state.packages = addFileByPath(current(state.files), action.payload.path, '', true)
        }
      }
    ),

    deleteFile: create.asyncThunk(
      async ({  path, wcInstance, isDirectory  }) => {
        if(isDirectory)
          await wcInstance.current.fs.rm(path, { recursive: true });
        else
          await wcInstance.current.fs.rm(path);

        return { path, isDirectory }
      },
      {
        pending: (state, action) => {

        },
        rejected: (state, action) => {

        },
        fulfilled: (state, action) => {
          state.files = deleteFileOrFolderByPath(current(state.files), action.payload.path)
        }
      }
    ),

    renameFile: create.asyncThunk(
      async ({ path, wcInstance, newName, endCb }) => {
        const lastSlashIndex = path.lastIndexOf('/');
        const pathDirectory = path.substring(0, lastSlashIndex + 1); 
        await wcInstance.current.fs.rename(path, `${pathDirectory}/${newName}`);
        return { path, newName, endCb }
      },
      {
        pending: (state, action) => {

        },
        rejected: (state, action) => {

        },
        fulfilled: (state, action) => {
          state.files = renameFileOrFolderByPath(current(state.files), action.payload.path, action.payload.newName)
          action.payload.endCb()
          const refresh = new CustomEvent('refresh');
          document.dispatchEvent(refresh);
        }
      }
    ),



  })
});
export const {
  initiallizeContainer,
  setUrl,
  selectFile,
  addFile,
  addFolder,
  addDependency,
  deleteFile,
  renameFile
} = webcontainerSlice.actions;
export default webcontainerSlice.reducer;