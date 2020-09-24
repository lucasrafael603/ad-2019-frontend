import React,{ useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal'
import backend from '../../services/api'
import {FiEdit2, FiTrash2, FiUsers} from 'react-icons/fi'
import '../Register/styles.css'

export default function Register(){

  
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [atual, setAtual] = useState(0)
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [deleteValue, setDeleteValue] = useState('')
  const [listUsers,setlistUsers] = useState([]) 
  const [repositorio, setRepositorio] = useState(() => {


      
    const dados = localStorage.getItem('@Users')
   
    
    if(dados){
      
      return JSON.parse(dados)

  }else {
     
      return []
  }

  } )



   async function SendEmail(){
        //console.log('Entrada', listUsers)

        Render()

        
        
        

    const dados = localStorage.getItem('@Email')
      

    const response =  await backend.post('/users/email', {

        name: '',
        email: dados,
        friend: ''

      })
        console.log('serv', response.data)
        window.alert('Email Enviado')
        Render()
  
    
  }

  async function Sort(){

    
    if(listUsers[0].length % 2 == 0){


    const response =  await backend.get('/users/sort')
    
    Render()
  }
  else{


    window.alert('The number of participants is incorrect, please adjust!!!')  


     }

  }


  async function Delete(id) {
    
      
      const response =  await backend.delete(`/users/${id}`)

      
      localStorage.removeItem('@Users')

      Render()
      
    

    }
  


  async function Render(e) {
      //e.preventDefault()
        
       setAtual((value) => 1 + value)
    
        const response =  await backend.get('/users')

        localStorage.setItem('@Users', JSON.stringify(response.data))

        

        const dados = localStorage.getItem('@Users')

        setRepositorio([...repositorio, dados])

        

        //window.location.reload()

  }

  async function HandleAddUser (event) {
    event.preventDefault()
    
    
        if(!nameValue | !emailValue){

         return window.alert('Have a null field')

        }

        //console.log('teste', repositorio)

        if(nameValue.length <= 2){

         return window.alert('Use a name longer than 2 letters')

        }


      try{

        const CreatePersons = await backend.post('/Users', {
          
          name: nameValue,
          email: emailValue,
          friend: ''

        })
        
        window.alert('User Created!!!')
        Render()
        setNameValue('')
        setEmailValue('')
        window.location.reload()
        
      }catch(err){


        window.alert('error')


      }
    
  }


  useEffect(() =>{
   

      backend.get('/users').then(response => setlistUsers(response.data) )
      console.log('teste',listUsers)
     

    
    
  }, [repositorio])


  return(
      <>
    <div>
     <div>
         <header> <span>Registration of participants</span> <span>(Secret Friend)</span> </header>
         <nav  style={{backgroundColor: "white"}}>
         <button style={{color: "white"}} className='check' onClick={Render} onClick={() => setIsModalVisible(true)}  ><Link><FiUsers></FiUsers></Link></button>
         </nav>
         <form onSubmit={HandleAddUser}>
          <fieldset>
          <span> Name: </span>
          <input type='text' onChange={(value) => setNameValue(value.target.value) } placeholder='Write your Name' type='text'/> 
          <span> Email: </span>
          <input type='text' onChange={(value) => setEmailValue(value.target.value) } placeholder='Write your Email' type='Email' /> 
          <button type='submit'> Complete registration </button>
          </fieldset>
          </form>
          <button onClick={Render}> Update participants </button>
          {isModalVisible ? <Modal onClose={ ()=> setIsModalVisible(false) } >
           <h2 style={{marginLeft: 300 }}> List of Persons </h2> 
            <ul>
          
            
             {listUsers[0].map((value, index) => {


                  return (

                    <>
                    <li key={index} style={{display: 'inline-block'}}> <span style={{fontWeight: "bold"}}> Id: {value._id}</span> | Name: {value.name} | Email: {value.email} | Friend: <span style={{fontWeight: 'bold'}}> { value.friend } </span>
                      <button style={{marginLeft: 15, marginRight: 15}} type={'submit'} onClick={() => Delete(value._id)} style={{display: 'inline-block'} , {marginLeft: 15} } > <FiTrash2/> </button> 
                      <Link to='/edit' > <button style={{display: 'inline-block'}} onClick={(val) => localStorage.setItem('@idUnico', value._id) } value={value._id} > <FiEdit2/> </button></Link>
                      
                      <button onClick={() => localStorage.setItem('@Email', [value.email], SendEmail())}> Email </button>
                      
                     </li>
                    <br/>
                    
                    </>
                    
                  )
                    

                                         })}
                     </ul>
                      <br/>
                    <button className='sort' onClick={Sort}> Sort </button>
                   </Modal> : null}
                   { listUsers.length > 0 ? <button onClick={Sort}> Sort </button> : <h1> Sem dados </h1> } 
            
      </div>
    </div>
    </>

  )
}