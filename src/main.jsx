import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/app/store.js';
import WebContainerContextProvider from './redux/WebContainerContext';
import 'react-mosaic-component/react-mosaic-component.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <WebContainerContextProvider>
      <App />
    </WebContainerContextProvider>
  </Provider>
  // </React.StrictMode>,
)
