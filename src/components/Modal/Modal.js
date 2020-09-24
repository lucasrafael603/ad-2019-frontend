import React from 'react'
import {DivModal} from '../Modal/styles'




const Modal = ({ onClose = () => {}, children}) => {


    return (

      
        <DivModal>
        <div className='container'>
          <button className='close' onClick={onClose} />

          <div className='dados' >
          <div className='content'> {children} </div>
          </div>
        </div>     
        </DivModal>

      
       

    )

  }


  export default Modal