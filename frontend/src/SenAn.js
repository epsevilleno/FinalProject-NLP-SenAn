import React, { useState, useEffect, useRef } from 'react';

function SenAn() {
  const [messages, setMessages] = useState([
    { text: "Welcome! I'm SenAnn. Please input a maximum of 300-character prompt.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const chatHistoryRef = useRef(null);

  const handleSend = () => {

    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            const botMessage = { text: data.label, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            throw new Error(data.label);
          });
        }
        return response.json();
      })
      .then((data) => {
        const botMessage = { text: data.label, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      })
      .catch((error) => {
        console.error('Error:', error);
        let errorMessage = 'An error occurred while sending the message. Please try again.';
        if (error.message === 'Failed to fetch') {
          errorMessage = 'Could not connect to the server. Please check the connection and try again.';
        }
        const errorNotification = { text: errorMessage, sender: 'system', isError: true };
        setMessages((prevMessages) => [...prevMessages, errorNotification]);
      });
    }
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container mt-5" style={{ height: '100%' }}>
      <div className="card d-flex flex-column" style={{ height: '100%' }}>
        <div className="card-body fixed-card-body d-flex flex-column">
          <div className="chat-history" ref={chatHistoryRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message d-flex ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <img
                  src={msg.sender === 'user' ? '/user.png' : '/robot.png'}
                  alt={msg.sender}
                  className="avatar"
                />  
                <p className={`alert ${msg.sender === 'user' ? 'alert-primary' : 'alert-secondary'} mx-2`} role="alert" style={{ whiteSpace: 'pre-line' }}>
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="card-footer" style={{ flexShrink: 0 }}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type in your sentence..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              style={{ flexGrow: 1, borderRadius: 15, paddingRight: '60px' }}
            />
            <button className="btn btn-primary" onClick={handleSend}><i className="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SenAn;
