import axios from "axios";
import { useState } from "react";

export const SignIn = () => {
    const [email , setEmail] = useState(''); 
    const [pass , setPass] = useState(''); 

    const signIn = async () => {
        if ( email !== '' && pass !== '') {
            await axios.post('/login' , {
                email: email, 
                password: pass
            }).then((res) => {
                if (res.data === "Incorrect password.") {
                   alert('Your password is incorrect.');  
                   setPass(''); 
                }
                else if ( res.data === "User not found.") {
                    alert("User not found."); 
                    setEmail(''); 
                    setPass(''); 
                }
                else {
                    alert('Logged in!'); 
                    window.localStorage.setItem("token", res.data.token); 
                    window.localStorage.setItem("isLoggedIn" , true); 
                    setTimeout(() => {
                        window.location.href = '/main'; 
                    }, 1500); 
                }
            }).catch((err) => console.log(err)); 
        }
        else {      
            setEmail(''); 
            setPass(''); 
            return alert('Must fill up those fields.'); 
        }; 
    }; 

    return <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh]">
        <div className="flex flex-col justify-center items-center w-2/4"> 
        <div className="font-bold text-2xl"> Sign in Center </div>
        <input style={{backgroundColor: 'black' , color: "white"}} type={"email"} placeholder="Type your email" className="m-5 rounded-full p-2" onChange={(e) => setEmail(e.target.value)} value={email}/>
        <input style={{backgroundColor: 'black' , color: "white"}} type={"password"} placeholder="Type your password" className="m-5 rounded-full p-2" onChange={(e) => setPass(e.target.value)} value={pass}/>
        <button style={{backgroundColor: "black" , color: "white" , width: '8vw' , padding: '0.1vw'}} className="rounded-full" onClick={() => signIn()}> Sign in </button>
        <button style={{backgroundColor: "black" , color: "white" , width: '8vw' , padding: '0.1vw'}} className="rounded-full mt-5" onClick={() => window.location.href = '/signUp'}> Sign Up </button>
        </div>
    </div>
}; 

export default SignIn;