import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Importamos el componente BrowserRouter.
import { BrowserRouter } from 'react-router-dom';

// Importamos AuthProvider para activar el contexto.
import { AuthProvider } from './contexts/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
  </React.StrictMode>,
)
