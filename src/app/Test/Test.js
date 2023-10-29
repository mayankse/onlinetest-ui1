"use client"
import React, { useEffect, useState, useRef } from 'react'
import ServerCall from '../common/services/ServerCAll'
import {useDispatch} from 'react-redux'
import { Question } from './Question'
import Button from '@mui/material/Button'
import Modal from '../Modal'
import styles from './Test.module.css'


export const Test = () => {
  const [questions,setQuestions]=useState([]);
  const [ans,setAns]=useState({})
  const [ansKey,setAnsKey]=useState({})
  const [isShowModal,setIsShowModal]=useState(false);
  const [modalInfo,setModalInfo]=useState({});
  const [isTestSubmitted,setIsTestSubmitted]=useState(false);
  const [timeLeft,setTimeLeft]=useState(60);
  const [interValId,setIntervalId]=useState();
  const dataRef=useRef({});
  const dispatch=useDispatch();
  
  useEffect(()=>
  {
    //Update the mutable reference whenever state changes
    dataRef.current={interValId,ans,ansKey};
  },[interValId,ans,ansKey]);

  const fnChange=(eve)=>
  {
    
    const { name, value, type, checked } = eve.target;
    if (type == "checkbox") {
      let selOptsArr = ans[name] ? ans[name].split("") : [];
      if (checked) {
        selOptsArr.push(value);
      } else {
        const index = selOptsArr.indexOf(value);
        selOptsArr.splice(index, 1);
      }
      setAns({
        ...ans,
        [name]: selOptsArr.sort().join(""),
      });
    } else {
      setAns({
        ...ans,
        [name]: value,
      });
    }
  }
const fnStartTimer=()=>
{
  setIntervalId(
    setInterval(()=>{
      setTimeLeft((val)=>{
      if (val==0){      
        fnValidate(
          dataRef.current.ans,
          dataRef.current.ansKey,
          dataRef.current.interValId
        );
        return val;
          }
      return val-1;
    });
  },1000)
  );
};
 const  fnGetQuestions=async()=>
  {
    try {
      dispatch({ type: "LOADER", payload: true });
      const res = await ServerCall.fnSendGetReq("test/get-que");
      let _ansKey = {};
      res.data.forEach(({ _id, ans }) => {
        _ansKey[_id] = ans;
      });
      setAnsKey(_ansKey);
      setQuestions(res.data);
      dispatch({ type: "LOADER", payload: false });
      fnStartTimer();
    } catch (e) {
      console.log(e);
      setQuestions([]);
      dispatch({ type: "LOADER", payload: false });
    }
  };
  
  useEffect(()=>{
    fnGetQuestions();
     /*
      Query logic
      */
    console.log('i fire once');
  },[])
  const fnClick=()=>
  {
    setModalInfo({
      text:"Are you Sure ?",
      isShowOk:true,
    });
    setIsShowModal(true);
  }
  const fnOK=()=>
  {
    fnValidate(ans,ansKey,interValId);
  }
  const fnValidate=(ans,ansKey,interValId)=>
  {
    clearInterval(interValId);
    setIsTestSubmitted(true);
    let marks=0;
    Object.keys(ans).forEach((val) => {
      if (ans[val] === ansKey[val]) {
        marks++;
      }
    });
    setModalInfo({
      text: `You got ${marks} mark(s)`,
      isShowOk: false,
    });
    setIsShowModal(true);
  }
  const fnClose=()=>
  {
    
    setModalInfo({
      text:"",
      isShowOk:false
    });
    setIsShowModal(false);
    if (isTestSubmitted)
    {
      window.location.reload();
    }
    
  }
  return (
    <div className='mb-5'>
      {
      questions.map((obj,index)=>
      {
        return (<Question fnChange={fnChange} 
        {...obj} 
        key={"que_"+index} 
        sno={index+1}/>);
      })
      }
      {questions.length>0  && (
      <>{isTestSubmitted ? (<Button onClick={()=>window.location.reload()} variant='contained'>Write Again</Button>
      ):(<Button onClick={fnClick} variant="contained">Submit</Button>)}
      </>)}
     {isShowModal  && (
      <Modal 
      text={modalInfo.text} 
      isShowOk={modalInfo.isShowOk} 
      fnOK={fnOK} 
      fnClose={fnClose}/>)}
     <h1 className={styles.timer}>{timeLeft}</h1>
    </div>
  );
};
