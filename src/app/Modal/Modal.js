import React from 'react'
import styles from './Modal.module.css'
import { Button } from '@mui/material'
let Modal = (props) => {
  const {text,isShowOk,fnOK,fnClose}=props;
  return (
    <div>
      <div className='mask'></div>
     <div className={`px-3 py-3 ${styles.modalContent}`}>
     <h5 className='text-center mb-5'>{text}</h5>
     <div className='text-center' >
     {isShowOk &&  (<Button onClick={fnOK} className="me-3" variant='contained'>OK</Button>)}
      <Button onClick={fnClose} variant='contained'>CLOSE</Button>
     </div>
      </div>   
    </div>
  )
}



export default Modal;