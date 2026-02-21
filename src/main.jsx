import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FeedbackApp from './feedback/FeedbackApp.jsx'

const isFeedback = window.location.pathname === '/f'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isFeedback ? <FeedbackApp /> : <App />}
  </StrictMode>,
)
