import React, { useState }from 'react'

function SenAn() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
          const userMessages = {text: input, sender: 'user'};
          setMessages([...messages, userMessages]);
          setInput('');

          fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: input}),
          })
          .then((response) => response.json())
          .then((data) => {
            const botMessage = {text: data.label, sender: 'bot'};
            setMessages((prevMessages) => [...prevMessages, botMessage]);
          })
          .catch((error) => {
            console.error('Error', error);
          });
        }
    };

    return(
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">SenAn: Your Sentence Sentiment Checker</div>
          <div className="card-body">
            <div className="chat-history" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <p className={`alert ${msg.sender === 'user' ? 'alert-primary' : 'alert-secondary'}`} role="alert">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" onClick={handleSend}>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default SenAn;
