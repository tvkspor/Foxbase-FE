import { Route, Routes, useLocation } from 'react-router-dom'
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout'
import BooksPage from './pages/BooksPage/BooksPage'
import AuthLayout from './components/Layout/AuthLayout/AuthLayout'
import LoginPage from './pages/LoginPage/LoginPage'
import SigninPage from './pages/SigninPage/SigninPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import BookDetailPage from './pages/BookDetailPage/BookDetailPage'
import DashboardLayout from './components/Layout/DashboardLayout/DashboardLayout'
import ExploreLayout from './components/Layout/ExploreLayout/ExploreLayout'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import ResultPage from './pages/ResultPage/ResultPage'
import { useEffect } from 'react'
import OAuth2SuccessPage from './pages/OAuth2SuccessPage/OAuth2SuccessPage'

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]); 

  return (
    <div>
        <Routes>
          <Route path='/' element={<DefaultLayout><BooksPage/></DefaultLayout>}/>
          <Route path='/oauth2-success' element={<OAuth2SuccessPage/>}/>
          <Route path='/auth/login' element={<AuthLayout context='login'><LoginPage/></AuthLayout>}/>
          <Route path='/auth/signin' element={<AuthLayout context='signup'><SigninPage/></AuthLayout>}/>
          <Route path='/auth/reset-password' element={<AuthLayout context='reset'><ResetPasswordPage/></AuthLayout>}/>
          <Route path='/book/detail' element={<DefaultLayout><BookDetailPage/></DefaultLayout>}/>
          <Route path='/dashboard' element={<DashboardLayout></DashboardLayout>}/>
          <Route path='/explore' element={<ExploreLayout><ExplorePage/></ExploreLayout>}/>
          <Route path='/explore/result' element={<ExploreLayout><ResultPage/></ExploreLayout>}/>
        </Routes>
    </div>
  )
}

export default App