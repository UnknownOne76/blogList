import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { FsContext } from "../context/fsCont";

export const SpecPost = () => {
   const { page , per } = useContext(FsContext); 

    const [spec , setSpec] = useState(null); 
    const [user , setUser] = useState(null); 
    const [txt , setTxt] = useState(''); 
    let { id } = useParams();  
    useEffect(() => {
            axios.get(`/spec/${id}`).then((res) => {
                setSpec(res.data);  
            }); 

            axios.post('/userDet', {
               token: window.localStorage.getItem("token"), 
            }).then((res) => {
               setUser(res.data);  
            }); 
    }, [id]);

    const addCmt = () => {
       if ( txt.trim() !== '') {
           axios.post(`/addComment/${id}` , {
              img: user.img, 
              name: user.name, 
              txt: txt
           }).then((res) => {
              console.log(res); 
            }).catch((err) => console.log(err)); 
            setTxt(''); 
       }
       else {
          alert(`trynna send empty one? no you shouldn't.`); 
       }
    }; 

   
   return <div className="flex flex-col justify-center items-center w-full"> 
          {spec && spec !== null ? 
           <div className="flex flex-col justify-center items-center w-5/6"> 
           <div className="flex flex-col justify-start items-center w-1/2 p-10">
             <div className="flex items-center w-2/4 font-bold text-3xl m-5"> {spec.title} </div>
             <div className="flex items-center w-2/4"> 
                <img alt="" src={spec.author.img} className="w-2/12 rounded-full"/>
                <div className="w-4/12 p-5"> {spec.author.name} </div>
                <div className="w-5/12 p-10"> | </div>
                <div className="w-4/12 p-5"> {spec.publishedAt.slice(0 , 10)} </div> 
             </div>
             </div>
             <img alt="" src={spec.blogImg} className="w-2/4" style={{borderRadius: '10%'}}/>
             <div className="flex flex-col justify-center items-center w-2/4 p-10 text-2xl text-center"> {spec.txt} </div>
             <div className="flex justify-center items-center w-3/12"> 
                <img alt="" src={spec.author.img} className="w-2/12 rounded-full"/> 
                <div className="flex flex-col justify-start items-center w-3/12 p-5"> 
                <div className="w-1/6"> Written by </div>
                <div className="w-1/6"> {spec.author.name} </div>
                <div className="w-1/6" style={{color: '#989898'}}> {spec.author.job} </div>
                </div>
             </div>
             <div className="flex flex-col justify-center items-center p-10 w-2/4">
               <div className="font-bold text-2xl p-5"> Join the Conversation </div>
               <div className="flex justify-start items-center w-2/4">  
               <img alt="" src={user !== null ? user.img : 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'} className="rounded-full w-2/12"/>
               <input type={"text"} style={{backgroundColor: 'black' , color: "white", padding: '0.5vh'}} placeholder="Add your opinion." className="m-5 rounded-full" onChange={(e) => setTxt(e.target.value)} value={txt}/>
               <button className="font-bold rounded-full text-center p-2" style={{color: "white" , backgroundColor: "black" , width: "20vw"}} onClick={() => addCmt()}> Send </button>
               </div>
             </div>
             <div className="flex flex-col justify-center items-center w-4/5 p-10 border-4 border-sky-500">
                 {spec && spec !== null ? spec.comments.map((x , i) => {
                   return <div className="flex justify-center items-center w-2/4 p-5" key={i}> 
                       <img alt="" src={x.img} className="w-2/12 rounded-full"/>
                       <div className="w-2/4 m-5 font-bold"> {x.name} </div>
                       <div className="w-2/4"> {x.txt} </div>
                   </div>
                 }) : <div> Loading comments... </div>}
             </div>
             <button onClick={() => window.location.href = `/main?page=${page}&perPage=${per}`} className="p-5"> Go back </button>
             </div>
          : <div> Loading. </div>} 
          </div>
};

export default SpecPost; 