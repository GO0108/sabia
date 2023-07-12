import React, { useState, useEffect } from "react";
import "./App.css";
import { getCurrentTabUId, getCurrentTabUrl, getSearchQuery, getUrlDomain } from "./chrome/utils";
import { ChromeMessage, Sender } from "./types";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState(" ");
  const [isSummarising, setIsSummarising] = useState(false);
  const [output, setOutput] = useState('');
  const [url, setUrl] = useState('');


  useEffect(() => {
    getCurrentTabUrl((url) => {
      setUrl(url || "undefined");
    });

  }, []);

  const handleClick = async () =>{
    setIsSummarising(true);
    const btn = document.getElementById('summarise') as HTMLInputElement | null;
    if(btn != null) {
      btn.disabled = true;
      btn.innerHTML = 'Summarising...';
    }

    let link = 'http://127.0.0.1:5000/summary?url=' + url
    console.log("link: " + link);
    const res = await fetch(link ,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    console.log("result: " + JSON.stringify(result));
    setOutput(result);
    setIsSummarising(false);
    if(btn != null) {
    btn.disabled = false;
    btn.innerHTML = 'Summarise';
    }
  }

  return (
    <>
      <h1>React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <h1 className="logo react">{message}</h1>
          <div>
            <button id="summarise" onClick={handleClick} disabled={isSummarising}>
            Summarise
            </button>
            <p id="output">{output}</p>
          </div>
      </div>
    </>
  )
}

export default App
