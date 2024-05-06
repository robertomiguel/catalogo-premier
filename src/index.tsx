import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from 'firebase/firestore'
import './css/index.css';
import AppContext from './appContext';

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
      const focusedElement = document.activeElement as HTMLElement;
      if (focusedElement) {
          focusedElement.blur();
      }
  }
};
document.addEventListener('keydown', handleKeyPress);

const fireApp = initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
});

const db: Firestore = getFirestore(fireApp)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppContext.Provider value={{ isAdmin: window.location.href.includes('?fordCargo!!2030'), db: db }}>
      <App />
    </AppContext.Provider>
  </React.StrictMode>
);
