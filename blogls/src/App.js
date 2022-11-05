import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { FsContext } from './context/fsCont';

function App() {
  const { data , page , setPage , maxPage , per } = useContext(FsContext); 
  const [isNext , setIsNext] = useState(true);
  const [isPrev , setIsPrev] = useState(false);  

  const signOut = () => {
     alert("Signout out. Have a nice day!"); 
    window.localStorage.removeItem("isLoggedIn"); 
    return window.location.href = '/login'; 
  }

  useEffect(() => {
      if ( page >= maxPage && maxPage !== null) { 
        return setIsNext(false);
      }
      else { 
           setIsNext(true); 
      };

      if (page !== 1) { 
        return setIsPrev(true); 
      }
      else {
         setIsPrev(false); 
      }; 
    }, [page, isNext , isPrev, maxPage]); 
    
  const prevPage = async () => {
    setPage((Number(page) - 1)); 
    axios.put('/posts' , {
      pageNumber: page
     }).then(() => {
        return window.location.href = `/main?page=${page - 1}&perPage=${per}`; 
     });
    };
    
    const nextPage = async () => {
      setPage(((Number(page) + 1))); 
      await axios.put('/posts' , {
        pageNumber: page
      }).then(() => {
          return window.location.href = `/main?page=${page + 1}&perPage=${per}`; 
      });
    };

  return (
    <div className="w-[100vw] md:w-auto m-5">
      <div className='flex flex-col items-center w-full'> 
      <div className='text-3xl font-bold'> Blog Posts </div>
      <div className='w-auto'> Latest updates of tiny projects. </div>
      <Link to={"/uploads"}> Uploads </Link>
      <div className='flex w-full justify-center items-center'> 
      <button style={{backgroundColor: 'black' , color: "white", width: '5vw'}} className="rounded-full mt-5 p-2 mr-5" onClick={() => signOut()}> Sign out </button>
      <button style={{backgroundColor: 'black' , color: "white", width: '5vw'}} className="rounded-full mt-5 p-2" onClick={() => window.location.href = '/post'}> Post center </button>
      </div>
      </div>
      <div className='grid grid-rows-1 grid-flow-col gap-10 p-10 w-full'> 
       {data && data !== null ? data.map((x, i) => {
         return <div key={i} className="flex flex-col justify-center items-center w-full border-4 hover:border-green-500 ease-in duration-300 p-5 cursor-pointer" onClick={() => window.location.href = `/spec/${x._id}`}> 
            <img src={x.blogImg} alt='' className='w-full h-[30vh] border-4 border-green-500' style={{borderRadius: "5%"}}/> 
            <div className='w-2/1'> 
              <div className='text-2xl font-bold mb-5'> {x.title} </div>
              <div className='font-normal'> {x.descrip} </div>
            </div> 
            <div className='flex justify-center items-center w-full p-5'>  
            <img src={x.author.img} alt='' className='w-2/12 rounded-full'/>
            <div className='w-2/4 pl-5'> {x.author.name} </div>
            <div className='w-2/12'> | </div>  
            <div className='w-2/4'> {x.publishedAt.slice(0 , 10)} </div>
            </div>
         </div>
       }): <div> Loading datas... </div>}
      </div>
      <div className='flex flex-col w-full justify-center items-center'> 
      <div> Current Page: {page} </div>
      <button onClick={() => prevPage()} style={{display: isPrev ? 'flex' : 'none'}}> Prev Page </button>
      <button onClick={() => nextPage()} style={{display: isNext ? 'flex' : 'none'}}> Next Page </button>
      </div>
    </div>
  );
}

export default App;
