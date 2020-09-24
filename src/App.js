import React from 'react';
import Routes from '../src/routes/index'
import { BrowserRouter } from 'react-router-dom'



//BrownserRouter deve ser utilizado ao redor do agrupamentos das rotas 

const App = () => {
  return (
    //<h1>Hello World</h1>
    <>
    <BrowserRouter>
    <Routes/>
    </BrowserRouter>
    </>
  )
}

export default App;
