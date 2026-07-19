import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Self-hosted brand fonts (previously loaded from Google Fonts' CDN, which
// added a third-party DNS/connection dependency for above-the-fold text and
// is unreachable from some network environments — see M-06/low-priority
// polish in the audit). Same weights as before: Space Grotesk
// 400/500/600/700, Hanken Grotesk 400/500/600/700/800.
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/hanken-grotesk/400.css'
import '@fontsource/hanken-grotesk/500.css'
import '@fontsource/hanken-grotesk/600.css'
import '@fontsource/hanken-grotesk/700.css'
import '@fontsource/hanken-grotesk/800.css'

import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
