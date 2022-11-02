import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export const FsContext = createContext({}); 

export const FsContextPrv = ({children}) => {
    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    const [ data , setData] = useState(null); 
    const [page , setPage] = useState(Number(query.get('page')));
    const [per , setPer] = useState(Number(query.get('perPage')) || 3);
    const [maxPage , setMaxPage] = useState(null);   

    useEffect(() => {
        if ( page === 0) return setPage(1); 
        axios.get(`/posts?page=${page}&perPage=${per}`).then((res) => {
            setData(res.data.data);  
            setMaxPage(res.data.pages); 
        });
    }, [data, page, per, maxPage]); 

    return <FsContext.Provider value={{data , page , maxPage, setPage, per}}> {children} </FsContext.Provider>
}; 

export default FsContextPrv; 