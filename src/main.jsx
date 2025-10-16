import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from './components/GlobalStyles/index.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './provider/AuthContext.jsx'
import BookProvider from './provider/BookContext.jsx'
import SearchProvider from './provider/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <GlobalStyles>
        <AuthProvider>
          <BookProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </BookProvider>
        </AuthProvider>
      </GlobalStyles>
    </BrowserRouter>
)
