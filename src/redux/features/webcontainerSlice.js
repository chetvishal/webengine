import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { WebContainer } from '@webcontainer/api';
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

export const createAppSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
  })


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
        loading: false
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
    })
});
export const { initiallizeContainer, setUrl } = webcontainerSlice.actions;
export default webcontainerSlice.reducer;