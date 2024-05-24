import React from 'react'
import SenAn from './SenAn'
import './App.css'

function App() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-4 left-container d-flex flex-column justify-content-center custom-margin-left'>
          <div className='logo'>SenAnn: Your Sentence Sentiment Checker</div>
          <div className='header'>Don't know how your words feel?</div>
          <div className='subheader'>SenAnn can help you check the sentiments of your sentences</div>
          <div className='footer1'>This project is made for compliance in the subject CCS 249 - Natural Language Processing</div>
          <div className='footer2'>By Gabriel, Juayong, Marmolejo, Petate, Sevilleno - BSCS 3A</div>
        </div>
        <div className="col-7 d-flex justify-content-end align-items-center">
          <div className="right-container">
            <SenAn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;