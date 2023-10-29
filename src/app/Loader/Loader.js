
import React from "react";
import styles from "./Loader.module.css";
export const Loader = () => {
  return (
    <>
      <div className="mask"></div>
      <img className={styles.loaderImg} src="loader.gif"></img>
    </>
  );
};





/*My Loader example*/
/*import React from 'react'
import styles from './Loader.module.css'

export const Loader = () => {
  const loaderArray=["loader.gif","loader5.gif","loader2.gif","loader3.gif","loader4.gif"];
  var randomIndex = Math.floor(Math.random() * loaderArray.length); 
  var randomElement = loaderArray[randomIndex];
  return (
    <>
    <div className={`mask`}></div>
    <img className={`${styles.loaderImg}`} src={`${randomElement}`}></img>
    </>
  )
}*/
