// frontend/src/App.js
import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import './App.css';
import { BrowserRouter, Routes, Route, Link, Router } from 'react-router-dom';
import Test from './components/test';
import ChatBot from './components/ChatBot';
import { ChatBubbleBottomCenterTextIcon as Chat  } from '@heroicons/react/24/outline'
import Popup from './components/Popup';

function App() {

  return (
    <>
      <div className='flex flex-col items-center justify-center text-center p-8 main h-full w-full'>
            <div className='flex items-center'>
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
