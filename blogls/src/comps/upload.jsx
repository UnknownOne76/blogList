import axios from "axios";
import { useState } from "react";

export const UploadCenter = () => {
    const [file , setFile] = useState('');
    const formData = new FormData(); 
    
    const uploadIt = async () => {
            if ( file === '') return 0; 
            formData.append('file' , file); 
            await axios.post('/upload' , formData).then((res) => console.log(res));   
    }; 

    return (    
        <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center">
           <div> 
              Upload photos.
           </div>
           <input type={"file"} onChange={(e) => setFile(e.target.files[0])}/>
           <button onClick={() => uploadIt()}> Upload </button>
        </div>
    )
};

export default UploadCenter; 