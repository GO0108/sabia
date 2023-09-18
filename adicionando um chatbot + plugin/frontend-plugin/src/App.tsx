// frontend/src/App.js
import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import './App.css';
function App() {

  interface message {
    content: string;
    role: string;
  }

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  //@ts-ignore
  const handleSend = async (message) => {
    const newMessage = {
      role: 'user',
      content: message
    };

    const newMessages = [...messages, newMessage];
    //@ts-ignore
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch('https://backend-plugin.vercel.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      console.log(data);
//@ts-ignore
      setMessages([...newMessages, { content: data.message.content, role: 'system' }]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
    }
  };

  return (
    <div className="App">
      <div style={{ position: 'relative', height: '400px', width: '700px' }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              style={{backgroundColor: '#191E2E'}}
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator style={{backgroundColor:"rgba(25, 30, 46, 0.2)", color:"#fff"}} content="ChatGPT is typing" /> : null}
            >
              {messages.map((message: message, i) => (
                <Message className="my-container" key={i} model={{
                  message: message.content,
                  sender: message.role,
                  direction: 0,
                  position: 0
                }} />
              ))}
            </MessageList>
            <MessageInput placeholder="Escreva a sua mensagem aqui" onSend={handleSend} attachButton={false}/>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
