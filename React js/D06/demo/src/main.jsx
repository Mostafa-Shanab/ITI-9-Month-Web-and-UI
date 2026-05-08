import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import App from './App/App'

import './i18n'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
