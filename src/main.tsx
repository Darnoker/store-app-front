import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './auth/AuthContext';
import { CartProvider } from './cart/CartContext';
import { LanguageProvider } from './i18n/LanguageContext';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider><AuthProvider><CartProvider><App /></CartProvider></AuthProvider></LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
