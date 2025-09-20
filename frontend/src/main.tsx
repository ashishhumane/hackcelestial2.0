import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register';
const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {
    console.log('App ready to work offline 🚀');
  },
});

createRoot(document.getElementById("root")!).render(<App />);
