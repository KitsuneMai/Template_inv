import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Providers } from './context/Providers.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers> {/* 👈 envuelve todo en el provider */}
      <App />
    </Providers>
  </StrictMode>,
)
