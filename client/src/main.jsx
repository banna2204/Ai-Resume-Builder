import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './app/store.js'

createRoot(document.getElementById('root')).render(
  <HashRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </HashRouter>,
)
