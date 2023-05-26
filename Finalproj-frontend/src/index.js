import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';



import { TestProvider } from './context/testContext';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5saHPjZcQj9-xUtJOKBGtlK96Daq4ubY",
  authDomain: "decentagram2.firebaseapp.com",
  projectId: "decentagram2",
  storageBucket: "decentagram2.appspot.com",
  messagingSenderId: "861992324189",
  appId: "1:861992324189:web:2e5114581ed6d4acc651b4",
  measurementId: "G-G7B46PE7QM"
};
ReactDOM.render(
  <React.StrictMode>
    <TestProvider>
      <BrowserRouter>
        <App />
        {/* <Apptest /> */}
        {/* <DropDown /> */}
      </BrowserRouter>
    </TestProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'users')


