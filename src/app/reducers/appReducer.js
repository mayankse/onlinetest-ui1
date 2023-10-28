"use client"
import { init } from "../utils/init"
export const appReducer=(state=init,action)=>
{
    switch(action.type){   
        case 'LOADER':
        return {
            ...state,
            isShowLoader:action.payload
        };
}
return state;
}