import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Register from '../components/Register/index'
import Edit from '../components/Edits/index'


const Routes = () => {
//Switch garante que somente 1 rota sera exibida
//Route é usado para declaração de rota.
// Caso o exact não exista no momento de escolher a rota vai pegar a primeira rota que contem determinada path escolhida.
return (

  <Switch> 
    
    <Route path='/' exact component={Register} />
    <Route path='/edit' exact component={Edit} />
    

  </Switch>
  )
}

export default Routes