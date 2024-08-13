import { useState, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [status,setStatus] = useState('active')
  const inputRef = useRef(null);

  let isError = status == 'error';
  let isLoading = status == 'loading'

  const shortenUrl = "https://api-ssl.bitly.com/v4/shorten";
  


  const shortenHandler = async() => {
      setStatus('loading');

      const token = import.meta.env.VITE_TOKEN;

      try {
        const response = await axios.post(
          shortenUrl,
          { "long_url": inputRef.current.value, "domain": "bit.ly" },
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        setStatus('active');
        console.log(response.data.link)
        setData(response.data.link);
      }
      catch(error) {
        setStatus('error')
      }
      
    }

  return (
    <>
    <h1>Link Shortener</h1>
    <p>Type or paste your link in the input box and click on the Shorten button</p>
    <div>
      <label htmlFor="link">Paste your link:</label>
      <input required ref={inputRef} type="text" name="link" id="link" />
    </div>
    <button onClick={shortenHandler}>Shorten</button>
    <div>
    <div >{isLoading?<p>Loading...</p>:isError?<p>Error</p>:<output>{data}</output>}</div>
    <button>copy</button>
    </div>
    </>
  )
}

export default App



