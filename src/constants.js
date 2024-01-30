import { WebContainer } from '@webcontainer/api';

// export const webcontainerInstance = await WebContainer.boot()
export const files = {
    'public': {
      directory: {
        'index.html': {
          file: {
            contents: `<div id="app"></div>`
          },
        }
      }
    },
    'src': {
      directory: {
        'App.js': {
          file: {
            contents: `import React from 'react';
import './style.css';

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
            `
          },
        },
        'index.js': {
          file: {
            contents: `import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
            `
          }
        },
        'style.css': {
          file: {
            contents: 
            `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 1rem;
  font-family: system-ui, sans-serif;
  color: black;
  background-color: white;
}

h1 {
  font-weight: 800;
  font-size: 1.5rem;
}        
            `
          }
        }
      }
    },
    'package.json': {
      file: {
        contents: `{
  "name": "react",
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.1.0",
    "react-dom": "^18.1.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {
    "react-scripts": "latest"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
        `
      }
    }
}