import { useState, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isError, setisError] = useState(false);
  const inputRef = useRef(null);

   const shortenUrl = "https://api-ssl.bitly.com/v4/shorten";
  


  const shortenHandler = async() => {
      setIsLoading(true);

      const token = "6c856e73f1d23b2e896ca069ccc0c2112c1b47b5";

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
        setIsLoading(false);
        setisError(false);
        console.log(response.data.link)
        setData(response.data.link);
      }
      catch(error) {
        setIsLoading(false);
        setisError(true);
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



