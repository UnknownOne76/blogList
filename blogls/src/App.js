import { useContext } from 'react';
import './App.css';
import { FsContext } from './context/fsCont';

function App() {
  const { data } = useContext(FsContext); 

  const signOut = () => {
     alert("Signout out. Have a nice day!"); 
    window.localStorage.removeItem("isLoggedIn"); 
    return window.location.href = '/login'; 
  }

  return (
    <div className="w-[100vw] md:w-auto m-5">
      <div className='flex flex-col items-center w-full'> 
      <div className='text-3xl font-bold'> Blog Posts </div>
      <div className='w-auto'> Latest updates of tiny projects. </div>
      <button style={{backgroundColor: 'black' , color: "white", width: '5vw'}} className="rounded-full mt-5 p-1" onClick={() => signOut()}> Sign out </button>
      </div>
      <div className='grid grid-rows-3 grid-flow-col gap-10 p-10 w-full'> 
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
    </div>
  );
}

export default App;
