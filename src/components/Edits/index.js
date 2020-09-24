import React, {useState, useEffect} from 'react'
import Register from '../Register/index'
import {Link} from 'react-router-dom'
import backend from '../../services/api'
import '../Edits/styles.css'






const Edit = ({ onClose = () => {}, children}) => {

  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [id, setIdValue] = useState('')


useEffect(() => {

  var idGet = localStorage.getItem('@idUnico')
  setIdValue(idGet)
  //console.log(id)

},[])

 async function HandleUpdate(){


    if(!nameValue | !emailValue){
    
    return window.alert('Have a null field')

   }


    if(nameValue.length <= 2){
      
      return window.alert('Use a name longer than 2 letters')
      
   }

        
    try{

        const dados = backend.put(`/users/${id}`, {

          name: nameValue,
          email: emailValue,
          friend: ''


      })

        window.alert('Changes Sucessfull')
      
    }catch(err){

        window.alert('Error')

      }
        
       

  }




    return (

        <>
        <Link to={'/'}><button> Home </button></Link>
        <h1> User Modifications: </h1>
        <div className='globalEdit'>
        <form onSubmit={HandleUpdate}>
          
          <div>
          <span> Name: </span>
          <input type='text' onChange={(value) => setNameValue(value.target.value) } placeholder='Write your Name' type='text'/> 
          </div>
          <div>
          <span> Email: </span>
          <input type='text' onChange={(value) => setEmailValue(value.target.value) } placeholder='Write your Email' type='Email' /> 
          </div>
          <button className='btn' type='submit'> Complete </button>
          
        </form>
        </div>
        </>

    )

  }


  export default Edit