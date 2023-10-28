"use client"
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export const Question = (props) => {
    const optionValues=['A','B','C','D']
    const {sno,que,_id,opt1,opt2,opt3,opt4,type,fnChange}=props
  return (
    <div>
          <Card className='margin-16' >
      <CardContent>
        <Typography variant="h5" component="div">
          {sno}.{que}
        </Typography>
        {
            [opt1,opt2,opt3,opt4].map((opt,ind)=>
            {
                if(!opt) return;
                return <Typography key={"opt_"+ind} variant="body2"> {optionValues[ind]}
                 <input value={optionValues[ind]} onChange={fnChange}type={type=='M' ? 'checkbox' :'radio'} name={_id}/> {opt1}
             </Typography>
            })
         }    
      </CardContent>
    </Card>

    </div>
  )
}
