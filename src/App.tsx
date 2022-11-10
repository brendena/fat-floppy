import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppProvider } from "./context"
import PageBody from "./components/pageBody"

function App() {
  return (
    <AppProvider>
      <PageBody></PageBody>
    </AppProvider>
  );
}

export default App;
/*
<h1>Fat Floppy</h1>
<h2>The premier website to handle Fat12 disk images</h2>
*/