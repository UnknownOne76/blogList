import axios from "axios";
import { useState } from "react";

export const SignUp = () => {

    const [name , setName] = useState(''); 
    const [email , setEmail] = useState(''); 
    const [pass , setPass] = useState(''); 
    const [photo , setPhoto] = useState(''); 

    const signUp = async () => {
        if ( name !== '' && email !== '' && pass !== '' && photo !== '') {
            if ( name.length >= 20 ) {
               setName(''); 
               return alert(`That's the longest name i've ever seen.`);
            }
            else {
                await axios.post('/users' , {
                    name: name, 
                    email: email, 
                    password: pass, 
                    img: photo, 
                }).then((res) => {
                    if ( res.data === "User was here before.") {
                        setName(''); 
                        setPass(''); 
                        setEmail(''); 
                        setPhoto(''); 
                        return alert('User has been already created.'); 
                    } 
                    alert('Signed Up!'); 
                     setTimeout(() => {
                        window.location.href = "/login"; 
                    } , 1500); 
                }).catch((err) => console.log(err)); 
            } 
        }
        else {
            setName(''); 
            setEmail(''); 
            setPass(''); 
            setPhoto(''); 
            return alert('You must fill all the type fields.'); 
        } 
    }

    return (
        <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh]">
            <div className="flex flex-col justify-center items-center w-2/4"> 
            <div className="font-bold text-2xl"> User Sign Up center </div>
            <input style={{backgroundColor: 'black' , color: "white"}} placeholder="Type your name" className="m-5 rounded-full p-2" value={name} onChange={(e) => setName(e.target.value)}/>
            <input style={{backgroundColor: 'black' , color: "white"}} type={"email"} placeholder="Type your email" className="m-5 rounded-full p-2" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input style={{backgroundColor: 'black' , color: "white"}} type={"password"} placeholder="Type your password" className="m-5 rounded-full p-2" value={pass} onChange={(e) => setPass(e.target.value)}/>
            <input style={{backgroundColor: 'black' , color: "white"}} placeholder="Insert the link of photo" className="m-5 rounded-full p-2" value={photo} onChange={(e) => setPhoto(e.target.value)}/>
            <button style={{backgroundColor: "black" , color: "white" , width: '8vw' , padding: '0.1vw'}} className="rounded-full" onClick={() => signUp()}> Sign Up </button>
            <div className="flex flex-col justify-center items-center m-5"> 
            <div className="font-bold text-2xl mb-5"> Already have an account? </div>
            <button style={{backgroundColor: "black" , color: "white" , width: '8vw' , padding: '0.1vw'}} className="rounded-full" onClick={() => window.location.href = '/login'}> Sign In </button>
            </div>
            </div>
        </div>
    )
}; 

export default SignUp; 