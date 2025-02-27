import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainContainer from './MainContainer'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainContainer />
  </StrictMode>,
)
