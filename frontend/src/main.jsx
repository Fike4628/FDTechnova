import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Set body background immediately to prevent flash of white
document.body.style.backgroundColor = '#0a0f1e'
document.body.style.color = '#f1f5f9'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
