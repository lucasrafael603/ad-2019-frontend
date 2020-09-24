import React,{ useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal'
import backend from '../../services/api'
import {FiEdit2, FiTrash2} from 'react-icons/fi'

export default function Register(){

  
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [deleteValue, setDeleteValue] = useState('')
  const [repositorio, setRepositorio] = useState(() => {


      
    const dados = localStorage.getItem('@Users')

    
    if(dados){
      //console.log(dados)
      return JSON.parse(dados)

  }else {
     
      return []
  }

  } )



   async function SendEmail(){

    
    const dados = localStorage.getItem('@Email')
      console.log(dados)

    const response =  await backend.post('/users/email', {

        name: dados[0],
        email: dados[1] ,
        friend: dados[2]

    })
        console.log('serv', response.data)
        window.alert('Email Enviado')
        window.location.reload()
  }

  async function Sort(){

    const response =  await backend.get('/users/sort')
    


  }


  async function Delete(id) {
    
       
      console.log('teste',repositorio)
      
      const response =  await backend.delete(`/users/${id}`)

      
      localStorage.removeItem('@Users')

      Render()
      
    

    }
  


  async function Render(e) {
    //e.preventDefault()
     
    //console.log('teste',repositorio)

    
        const response =  await backend.get('/users')

        localStorage.setItem('@Users', JSON.stringify(response.data))

        console.log(repositorio)

        const dados = localStorage.getItem('@Users')

        setRepositorio([...repositorio, dados])

        console.log(repositorio)

        window.location.reload()

  }

  async function HandleAddUser (event) {
    event.preventDefault()
    
    
        if(!nameValue | !emailValue){

          window.alert('Error')

        }

        console.log('teste', repositorio)
        
    const CreatePersons = await backend.post('/Users', {
          
      name: nameValue,
      email: emailValue,
      friend: ''
    })
    
  
    window.alert('User Created!!!')

    setNameValue('')
    setEmailValue('')
    window.location.reload()

  }


  useEffect(() =>{
   async function All() {

      //  const response =  await backend.get('/users')

      //  localStorage.setItem('@Users', JSON.stringify(response.data))


      //console.log(repositorio)
      
      
    }

    All()

  }, [])


  return(
      <>
    <div>
     <div>
         <header> Registration of participants </header>
         <nav>
         <button onClick={Render} onClick={() => setIsModalVisible(true)}  ><Link>Check Participants</Link></button>
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
          <button onClick={Render}> Atualizar Participantes </button>
          {isModalVisible ? <Modal onClose={ ()=> setIsModalVisible(false) } >
           <h2 style={{marginLeft: 300 }}> List of Persons </h2> 
            <ul>
             
             {repositorio.map((value, index) => {


                  return (
                    <>
                    <li key={index} style={{display: 'inline-block'}}> <span style={{fontWeight: "bold"}}> Id: {value._id}</span> | Name: {value.name} | Email: {value.email} | Amigo: <span style={{fontWeight: 'bold'}}> { value.friend } </span>
                      <button style={{marginLeft: 15, marginRight: 15}} type={'submit'} onClick={() => Delete(value._id)} style={{display: 'inline-block'} , {marginLeft: 15} } > <FiTrash2/> </button> 
                      <Link to='/edit' > <button style={{display: 'inline-block'}} onClick={(val) => localStorage.setItem('@idUnico', value._id) } value={value._id} > <FiEdit2/> </button></Link>
                      <button onClick={() => localStorage.setItem('@Email', [value.name ,  value.email, value.friend] )  }> Send Email </button>
                      <button onClick={SendEmail}> teste </button>
                     </li>
                    <br/>
                    </>

                  )
                

                                         })}
                     </ul>
                      <br/>
           
                   </Modal> : null}
                    <button onClick={Sort}> Sort </button>
      </div>
    </div>
    </>

  )



}