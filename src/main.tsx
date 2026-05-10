import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Remove loading screen after React mounts
const loader = document.getElementById('app-loading');
if (loader) {
  // Short delay so first paint is visible before fade
  requestAnimationFrame(() => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 450);
  });
}
