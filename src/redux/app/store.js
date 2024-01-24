import { configureStore } from '@reduxjs/toolkit';
import webcontainerSlice from '../features/webcontainerSlice';

export const store = configureStore({
  reducer: {
    webcontainer: webcontainerSlice
  },
});