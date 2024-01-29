import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { WebContainer } from '@webcontainer/api';
import { buildCreateSlice, asyncThunkCreator, current } from '@reduxjs/toolkit'
import { files } from "../../constants";
import cloneDeep from "lodash/cloneDeep";

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

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

// export const getPost = createAsyncThunk("posts/getPost", async ({ postId, token }) => {
//   try {
//     const response = await axios.get(`${apiEndPoint()}/post/${postId}`, {
//       headers: {
//         'Authorization': token
//       }
//     });
//     return response.data.post;
//   }
//   catch (error) {
//     console.log("Error fetching post: ", error.message);
//     throw new Error(error.message);
//   }
// })

export const webcontainerSlice = createAppSlice({
  name: 'webcontainer',
  initialState: {
    webcontainerInstance: '',
    url: '',
    files: files,
    loading: true,
    selectedFile: {
      path: ''
    }
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
          state.loading = false
          console.log("action.payload: ", action.payload)
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
  })
});
export const { initiallizeContainer, setUrl, selectFile, addFile, addFolder } = webcontainerSlice.actions;
export default webcontainerSlice.reducer;