import axios from "axios";
import { useState } from "react";

export const Post = () => {

    const [lnk , setLnk] = useState(null);
    const [title , setTitle] = useState(null); 
    const [desc , setDesc] = useState(null); 
    const [txt , setTxt] = useState(null); 
    let id; 
    
    const postDat = async () => {

        await axios.post('/userDet', {
            token: window.localStorage.getItem("token"), 
         }).then((res) => {
            id = res.data._id;  
         }); 

        if ( lnk !== null && title !== null && desc !== null && txt !== null) {
            await axios.post('/post', {
                title: title,
                descrip: desc, 
                txt: txt, 
                blogImg: lnk,  
                comments: [], 
                publishedAt: new Date().toISOString(), 
                userId: id
            }).then((res) => {
                console.log(res);  
            }).catch((e) => console.log(e)); 
            
            setLnk(''); 
            setTitle(''); 
            setDesc(''); 
            setTxt(''); 
        }
        else {
            alert("Must fill out the fields to post."); 
            setTxt(''); 
            setLnk(''); 
            setDesc(''); 
            setTitle(''); 
        }
    }; 

    return <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center"> 
         <div className="font-bold text-2xl"> Blog post center </div>
         <input style={{backgroundColor: 'black' , color: "white"}} placeholder="photo link of content" className="m-5 rounded-full p-2" onChange={(e) => setLnk(e.target.value)}/>
         <input style={{backgroundColor: 'black' , color: "white"}} placeholder="type the title of content" className="m-5 rounded-full p-2" onChange={(e) => setTitle(e.target.value)}/>
         <input style={{backgroundColor: 'black' , color: "white"}} placeholder="type descripion for content" className="m-5 rounded-full p-2 w-2/12" onChange={(e) => setDesc(e.target.value)}/>
         <input style={{backgroundColor: 'black' , color: "white"}} placeholder="type all the text inside content" className="m-5 rounded-full p-2 w-2/12" onChange={(e) => setTxt(e.target.value)}/>
         <button style={{backgroundColor: 'black' , color: "white", width: '5vw'}} className="rounded-full mt-5 p-2" onClick={() => postDat()}> Post data </button>
    </div>
}; 


export default Post; 