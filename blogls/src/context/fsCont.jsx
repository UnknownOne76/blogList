import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const FsContext = createContext({}); 

export const FsContextPrv = ({children}) => {
    const [ data , setData] = useState(null); 
    
    useEffect(() => {
        axios.get('/lists').then((res) => {
            setData(res.data); 
        });
    }, [data]); 

    return <FsContext.Provider value={{data}}> {children} </FsContext.Provider>
}; 

export default FsContextPrv; 