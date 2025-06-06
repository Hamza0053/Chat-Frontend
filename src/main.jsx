import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from './context/ThemeContext';
import ChatProvider from './context/ChatProvider';
import { LoadingProvider } from './context/LoadingContext';
import App from './App';
import { ContactsProvider } from './context/ContactsContext';
import { CallProvider } from './context/CallContext';
import AudioCall from './components/WebRTC/AudioCall';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ChatProvider>
          <LoadingProvider>
            <ContactsProvider>
              <CallProvider>
                <App />
                <AudioCall />
              </CallProvider>
            </ContactsProvider>
          </LoadingProvider>
        </ChatProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
