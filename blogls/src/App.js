import { useEffect, useState } from 'react';
import axios from 'axios'; 
import './App.css';

function App() {
  const [ data , setData] = useState(); 

  useEffect(() => {
     axios.get('/lists').then((res) => {
      console.log(res.data); 
     })
  }, [])

  return (
    <div className="text-3xl font-bold">
       Hello worldah!
    </div>
  );
}

export default App;
