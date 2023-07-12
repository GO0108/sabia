import React, { useState, useEffect } from "react";
import "./App.css";
import { getCurrentTabUId, getCurrentTabUrl, getSearchQuery, getUrlDomain } from "./chrome/utils";
import { ChromeMessage, Sender } from "./types";
import axios from "axios";

function App() {
  const [isSummarising, setIsSummarising] = useState(false);
  const [isSummarisingSum, setIsSummarisingSum] = useState(false);
  const [output, setOutput] = useState([]);
  const [outputSum, setOutputSum] = useState([]);
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
      btn.innerHTML = 'gerando palavras-chaves...';
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
    btn.innerHTML = 'palavras-chaves';
    }
  }
  const handleClickSum = async () =>{
    setIsSummarisingSum(true);
    const btn = document.getElementById('summ') as HTMLInputElement | null;
    if(btn != null) {
      btn.disabled = true;
      btn.innerHTML = 'resumindo...';
    }

    let link = 'http://127.0.0.1:5000/summ?url=' + url
    console.log("link: " + link);
    const res = await fetch(link ,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    console.log("result: " + JSON.stringify(result));
    setOutputSum(result);
    setIsSummarisingSum(false);
    if(btn != null) {
    btn.disabled = false;
    btn.innerHTML = 'resumo';
    }
  }

  return (
    <>
      <div className="card">
          <div>
            <button id="summarise" onClick={handleClick} disabled={isSummarising}>
            palavras-chaves
            </button>
            <button id="summ" onClick={handleClickSum} disabled={isSummarisingSum}>
            resumo
            </button>
            <div>
            <div id="output"><h1>Resultado</h1>{output.map((item: string)=><p className="p-keyword">{item}</p>)}</div>
            <div id="output"><h1>Resultado</h1>{outputSum}</div>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
