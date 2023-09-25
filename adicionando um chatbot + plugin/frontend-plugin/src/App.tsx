// frontend/src/App.js
import { useEffect, useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import './App.css';
import { BrowserRouter, Routes, Route, Link, Router } from 'react-router-dom';
import Test from './components/test';
import ChatBot from './components/ChatBot';
import { ChatBubbleBottomCenterTextIcon as Chat  } from '@heroicons/react/24/outline'
import Popup from './components/Popup';
import { getCurrentTabUId, getCurrentTabUrl, getSearchQuery, getUrlDomain } from "./chrome/utils";
import { Textarea } from './components/Textarea';
import { PhotoIcon } from '@heroicons/react/24/outline'
import { Imagens } from './components/Imagens';

interface query {
  query: string;
}
interface results {
  text: string;
  link: string;
}

interface Props {
  readonly name: string;
}

function App() {
  const [url, setUrl] = useState('');
  const [domain, setDomain] = useState<query | null>(null);
  const [search, setSearch] = useState([]);

  useEffect(()=> {
    getCurrentTabUrl((url) => {
      setUrl(url || 'o')
    })
  }, [])

  const sendwiki = async (query: query) => {
      const urlQuery = query
      setDomain(urlQuery)
      let link = 'https://backend-flask-deploy.vercel.app/?url=' + urlQuery
        
        const res = await fetch(link, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const result = await res.json()
        console.log(result)
        setSearch(result)
  }

  /** d
  fetch('http://127.0.0.1:5000/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response)
  //@ts-ignore
  .then(data => console.log(data.title))
  .catch(error => console.error(error))
  */

  
  return (
    <>

      <div className='flex flex-col items-center justify-center text-center p-8 main h-full w-full'>
            <div className='flex flex-col'>
                  {url !== 'o' ?
                  <div className='flex flex-col items-start p-2'>
                  <h1 className=''>Site atual</h1>
                  <h1 className='text-2xl'>{getUrlDomain(url)}</h1> 
                  </div>
                  : 
                  <div>
                  </div>
                  }
                  <div className='text-xs flex flex-col items-start text-left'>
                    
                    {search.map((item: results) => (
                    <p className='p-2 border border-gray-700 rounded-r-3xl m-2'>{item.text}{item.link}</p>
                    
                  ))}</div>
            <div className='flex items-center flex-row'>
            
            
            <PhotoIcon className='h-6 w-6'/>

                  {/*@ts-ignore**/}
            <MessageInput placeholder="Escreva o seu termo de busca aqui" onSend={sendwiki} attachButton={false}/>
            
            {domain != null ? <Imagens query={domain}/> : <></>}
            
            </div>
            </div>
            <div className='flex items-center flex-row'>
              <Popup/>
              <Popup/>
              <Popup/>
              <Popup/>
            </div>
      </div>
    </>
  )
}

export default App;
