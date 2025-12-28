import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="650472188420-779rpf2ht6q28g4n645td4sf8ghbbsec.apps.googleusercontent.com">
        <CartProvider>
          <App />
        </CartProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
