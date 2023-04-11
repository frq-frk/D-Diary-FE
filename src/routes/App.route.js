import { Routes, Route } from 'react-router-dom'

import Home from '../pages/home/Home'
import Dashboard from '../pages/profile/Dashboard'
import Login from '../pages/login/Login'
import TodayEntry from '../pages/diary/TodayEntry'
import PastEntries from '../pages/diary/PastEntries'
import VerifyEmailPage from '../pages/utilPages/VerifyEmailPage'
import UpdateProfileForm from '../components/forms/UpdateProfileForm'
import NewPasswordPage from '../pages/login/NewPasswordPage'
import FirebaseEmailRouteHandler from './FirebaseEmailRouteHandler'
import PageNotFound from '../pages/utilPages/PageNotFound'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      {/* <Route path='/pageflip' element={<PageFlip />}></Route> */}
      <Route path="/entry" element={<TodayEntry />}></Route>
      <Route path="/pastEntries" element={<PastEntries />}></Route>
      <Route path="/verifyEmail" element={<VerifyEmailPage />}></Route>
      <Route path="/updateProfile" element={<UpdateProfileForm />}></Route>
      <Route path="/newPassword" element={<NewPasswordPage />}></Route>
      <Route path="/emailRouting" element={<FirebaseEmailRouteHandler />}></Route>
      <Route path="/404" element={<PageNotFound />}></Route>
      
    </Routes>
  )
}

export default AppRoutes
