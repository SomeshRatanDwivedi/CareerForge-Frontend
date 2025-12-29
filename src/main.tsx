import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { PageBuilderProvider } from './contexts/PageBuilderContext.tsx';
import { HelmetProvider } from 'react-helmet-async';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
    <BrowserRouter>
      <PageBuilderProvider>
        <App />
      </PageBuilderProvider>
      </BrowserRouter>
      </HelmetProvider>
  </StrictMode>,
)
